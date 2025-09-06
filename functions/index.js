// functions/index.js

const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();
const db = admin.firestore();

exports.dailyGitHubScout = onSchedule("every day 00:05", async (event) => {
  logger.info("Starting daily GitHub scout...");

  const privateDataSnapshot = await db.collectionGroup("private").where("username", "!=", null).get();

  if (privateDataSnapshot.empty) {
    logger.info("No users with linked GitHub accounts found. Exiting.");
    return null;
  }

  const processingPromises = [];

  privateDataSnapshot.forEach((doc) => {
    const userData = doc.data();
    const userId = doc.ref.parent.parent.id;
    const { username, accessToken } = userData;

    // Gemini Note: This is the new logic block. We are wrapping it in a self-calling
    // async function to use await inside the forEach loop.
    const promise = (async () => {
      try {
        logger.info(`Fetching events for user: ${username}`);

        // This API endpoint fetches public events performed by a user.
        const apiUrl = `https://api.github.com/users/${username}/events/public`;

        const response = await axios.get(apiUrl, {
          headers: {
            // We authenticate using the user's stored OAuth token.
            Authorization: `token ${accessToken}`,
            "Accept": "application/vnd.github.v3+json",
          },
        });

        // We calculate the timestamp for 24 hours ago to fetch recent events.
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Filter for events that are commits (PushEvent) and occurred in the last day.
        const recentPushEvents = response.data.filter(
          (e) => e.type === "PushEvent" && new Date(e.created_at) > yesterday
        );

        if (recentPushEvents.length === 0) {
          logger.info(`User ${username} has no new push events. Nothing to process.`);
          return `Processed ${userId} with no new events.`;
        }

        let totalLinesAdded = 0;
        const commitUrls = new Set(); // Use a Set to avoid processing the same commit twice

        // Extract all unique commit URLs from the push events
        recentPushEvents.forEach(event => {
          event.payload.commits.forEach(commit => {
            if (commit.distinct) { // Only count distinct commits
              commitUrls.add(commit.url);
            }
          });
        });

        // Fetch details for each unique commit
        for (const url of commitUrls) {
          try {
            const commitDetails = await axios.get(url, {
              headers: {
                Authorization: `token ${accessToken}`,
                "Accept": "application/vnd.github.v3+json",
              },
            });
            totalLinesAdded += commitDetails.data.stats.additions;
          } catch (commitError) {
            logger.warn(`Could not fetch details for commit ${url}. Skipping.`, { errorMessage: commitError.message });
          }
        }

        if (totalLinesAdded === 0) {
          logger.info(`User ${username} had commits, but total lines added was zero.`);
          return `Processed ${userId} with zero lines added.`;
        }

        // Create a new session object in Firestore
        const session = {
          startTime: yesterday.getTime(),
          endTime: yesterday.getTime(),
          duration: 0,
          sessionScore: totalLinesAdded, // Using lines added directly as the score
          notes: `GitHub Activity: ${totalLinesAdded} lines added across ${commitUrls.size} commit(s).`,
          type: 'productivity',
          completedTasks: [],
          location: null,
          breaks: [],
        };

        await db.collection('users').doc(userId).collection('sessions').add(session);

        logger.info(`Successfully created GitHub session for ${username} with ${totalLinesAdded} lines added.`);
        return `Processed ${userId}`;
      } catch (error) {
        logger.error(`Failed to fetch GitHub data for ${username}`, {
          // We log the error message without logging the user's token.
          errorMessage: error.message,
          apiUrl: `https://api.github.com/users/${username}/events/public`,
        });
        return `Failed for ${userId}`;
      }
    })();

    processingPromises.push(promise);
  });

  await Promise.all(processingPromises);
  logger.info(`GitHub scout finished. Processed ${processingPromises.length} users.`);
  return null;
});