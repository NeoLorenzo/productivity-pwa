// functions/index.js

const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();
const db = admin.firestore();

// Gemini Note: Sanity check limit for lines in a single commit.
const COMMIT_LINE_LIMIT = 2500;

// Gemini Note: Regex patterns to ignore commits containing certain files.
const IGNORED_PATTERNS = [
  /package-lock\.json$/,
  /yarn\.lock$/,
  /pnpm-lock\.yaml$/,
  /\.min\.js$/,
  /\.svg$/,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.gif$/,
  /\.webp$/,
  /node_modules\//,
  /dist\//,
  /build\//,
];

/**
 * @description Fetches all pages from a paginated GitHub API endpoint.
 * @param {string} url - The initial URL to fetch.
 * @param {string} accessToken - The user's GitHub access token.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of all items.
 */
const fetchAllPages = async (url, accessToken) => {
  let results = [];
  let nextUrl = url;

  while (nextUrl) {
    try {
      const response = await axios.get(nextUrl, {
        headers: {
          Authorization: `token ${accessToken}`,
          "Accept": "application/vnd.github.v3+json",
        },
      });

      results = results.concat(response.data);

      const linkHeader = response.headers.link;
      if (linkHeader) {
        const nextLink = linkHeader.split(',').find((s) => s.includes('rel="next"'));
        nextUrl = nextLink ? nextLink.match(/<(.+)>/)[1] : null;
      } else {
        nextUrl = null;
      }
    } catch (error) {
      logger.error(`Failed to fetch page: ${nextUrl}`, { errorMessage: error.message });
      break;
    }
  }
  return results;
};

exports.dailyGitHubScout = onSchedule({
  schedule: "every day 00:05",
  timeoutSeconds: 540,
  memory: "512MiB",
}, async (event) => {
  logger.info("Starting daily GitHub scout...");

  const privateDataSnapshot = await db.collectionGroup("private").where("username", "!=", null).get();

  if (privateDataSnapshot.empty) {
    logger.info("No users with linked GitHub accounts found. Exiting.");
    return null;
  }

  for (const doc of privateDataSnapshot.docs) {
    const privateData = doc.data();
    const userId = doc.ref.parent.parent.id;
    const { username, accessToken, lastGithubScoutTimestamp } = privateData;

    const nowTimestamp = new Date().toISOString();

    try {
      const userDoc = await db.collection('users').doc(userId).get();
      const githubSettings = userDoc.data()?.githubSettings || { linesOfCodeScore: 0.1 };
      const scorePerLine = githubSettings.linesOfCodeScore;

      logger.info(`Processing user: ${username}. Last scout: ${lastGithubScoutTimestamp || 'Never'}`);

      const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
      const repos = await fetchAllPages(reposUrl, accessToken);
      logger.info(`Found ${repos.length} repositories for ${username}.`);

      const dailyStats = {};

      let commitsUrlModifier = "";
      if (lastGithubScoutTimestamp) {
        commitsUrlModifier = `&since=${lastGithubScoutTimestamp}`;
      }

      const allCommitsPromises = repos.map(repo => {
        const commitsUrl = `https://api.github.com/repos/${repo.full_name}/commits?author=${username}&per_page=100${commitsUrlModifier}`;
        return fetchAllPages(commitsUrl, accessToken);
      });
      const allCommitsArrays = await Promise.all(allCommitsPromises);
      const allCommits = allCommitsArrays.flat();

      if (allCommits.length === 0) {
        logger.info(`No new commits found for ${username} since last scout. Updating timestamp.`);
        await doc.ref.update({ lastGithubScoutTimestamp: nowTimestamp });
        continue;
      }

      logger.info(`Found ${allCommits.length} new commits to process for ${username}.`);

      const commitDetailsPromises = allCommits.map(commit =>
        axios.get(commit.url, {
          headers: {
            Authorization: `token ${accessToken}`,
            "Accept": "application/vnd.github.v3+json",
          },
        }).catch(err => {
          logger.warn(`Could not fetch details for commit ${commit.url}. Skipping.`, { errorMessage: err.message });
          return null;
        })
      );
      const allCommitDetails = await Promise.all(commitDetailsPromises);

      // Gemini Note: Process each commit individually to sanitize its line counts.
      allCommitDetails.forEach(details => {
        if (!details || !details.data || !details.data.files) {
          return; // Skip malformed commit details.
        }

        // Gemini Note: Calculate lines added by summing up only the valid files.
        let sanitizedLinesAdded = 0;
        for (const file of details.data.files) {
          const isIgnored = IGNORED_PATTERNS.some(pattern => pattern.test(file.filename));
          if (!isIgnored) {
            sanitizedLinesAdded += file.additions;
          }
        }

        // Apply the sanity check limit to the *sanitized* total.
        if (sanitizedLinesAdded > COMMIT_LINE_LIMIT) {
          logger.info(`Ignoring commit ${details.data.sha} (sanitized total exceeds line limit: ${sanitizedLinesAdded})`);
          return;
        }

        if (sanitizedLinesAdded > 0) {
          const date = new Date(details.data.commit.author.date);
          const dateString = date.toISOString().split('T')[0];

          if (!dailyStats[dateString]) {
            dailyStats[dateString] = { linesAdded: 0, commitCount: 0 };
          }
          dailyStats[dateString].linesAdded += sanitizedLinesAdded;
          dailyStats[dateString].commitCount += 1;
        }
      });

      if (Object.keys(dailyStats).length > 0) {
        const batch = db.batch();
        for (const dateString in dailyStats) {
          const stats = dailyStats[dateString];
          const sessionScore = stats.linesAdded * scorePerLine;
          const sessionId = `github-${dateString}`;
          const sessionRef = db.collection('users').doc(userId).collection('sessions').doc(sessionId);
          const date = new Date(dateString);
          const timestamp = date.getTime() + (12 * 60 * 60 * 1000);

          const session = {
            startTime: timestamp,
            endTime: timestamp,
            duration: 0,
            sessionScore: parseFloat(sessionScore.toFixed(2)),
            notes: `GitHub Activity: ${stats.linesAdded} lines added across ${stats.commitCount} valid commit(s).`,
            type: 'productivity',
            completedTasks: [],
            location: null,
            breaks: [],
          };
          batch.set(sessionRef, session, { merge: true });
        }
        await batch.commit();
        logger.info(`Successfully created/updated ${Object.keys(dailyStats).length} daily GitHub sessions for ${username}.`);
      }

      await doc.ref.update({ lastGithubScoutTimestamp: nowTimestamp });

    } catch (error) {
      logger.error(`Failed to process GitHub data for ${username}`, {
        errorMessage: error.message,
        stack: error.stack,
      });
    }
  }

  logger.info(`GitHub scout finished. Processed ${privateDataSnapshot.size} users.`);
  return null;
});