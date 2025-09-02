// src/utils/sessionAggregators.js

import { formatDuration, formatDate } from './formatters';

/**
 * @description Calculates the productivity points for a single session based on a formula.
 * @param {object} session - The session object.
 * @param {object} formula - The formula configuration object.
 * @returns {number} The calculated productivity points.
 */
export function calculateProductivityPoints(session, formula) {
  // Gemini Note: This function now only calculates points for 'productivity' sessions.
  // For backward compatibility, sessions without a 'type' are treated as productivity.
  if (!session || !formula || !formula.timeDivisor || (session.type && session.type !== 'productivity')) {
    return 0;
  }

  const deepWorkMinutes = session.duration / 60;
  const taskScore = session.sessionScore || 0;

  const timePoints = deepWorkMinutes / formula.timeDivisor;

  return timePoints + taskScore;
}

/**
 * @description Calculates the play points for a single session based on a formula.
 * @param {object} session - The session object.
 * @param {object} formula - The formula configuration object.
 * @returns {number} The calculated play points.
 */
export function calculatePlayPoints(session, formula) {
  if (!session || !formula || !formula.playTimeDivisor || session.type !== 'play') {
    return 0;
  }

  const playMinutes = session.duration / 60;
  const playPoints = playMinutes / formula.playTimeDivisor;

  return playPoints;
}

/**
 * @description Aggregates session data by day, calculating totals for duration, count, score, and productivity points.
 * @param {Array<object>} sessions - The array of session objects from useTimer.
 * @param {object} formula - The formula configuration object.
 * @returns {Array<object>} An array of objects, each representing a day with aggregated data, sorted by most recent.
 */
export function aggregateSessionsByDay(sessions, formula) {
  if (!sessions || sessions.length === 0) {
    return [];
  }

  const dailyData = sessions.reduce((acc, session) => {
    const dateKey = new Date(session.endTime).toLocaleDateString('en-CA');

    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: session.endTime,
        totalDuration: 0, // Now represents productivity duration
        totalPlayDuration: 0,
        sessionCount: 0,
        totalScore: 0,
        totalProductivityPoints: 0,
        totalPlayPoints: 0,
        dailyHarmonyScore: 0,
      };
    }

    // For backward compatibility, treat sessions without a type as 'productivity'
    const sessionType = session.type || 'productivity';

    if (sessionType === 'productivity') {
      acc[dateKey].totalDuration += session.duration;
      acc[dateKey].sessionCount += 1;
      acc[dateKey].totalScore += session.sessionScore || 0;
      acc[dateKey].totalProductivityPoints += calculateProductivityPoints(session, formula);
    } else if (sessionType === 'play') {
      acc[dateKey].totalPlayDuration += session.duration;
      acc[dateKey].totalPlayPoints += calculatePlayPoints(session, formula);
    }
    
    // Recalculate harmony score for the day
    acc[dateKey].dailyHarmonyScore = acc[dateKey].totalProductivityPoints - acc[dateKey].totalPlayPoints;

    return acc;
  }, {});

  return Object.values(dailyData).sort((a, b) => b.date - a.date);
}