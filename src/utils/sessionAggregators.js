// src/utils/sessionAggregators.js

import { formatDuration, formatDate } from './formatters';

/**
 * @description Calculates the productivity points for a single session based on a formula.
 * @param {object} session - The session object.
 * @param {object} formula - The formula configuration object.
 * @returns {number} The calculated productivity points.
 */
export function calculateProductivityPoints(session, formula) {
  if (!session || !formula || !formula.timeDivisor) {
    return 0;
  }

  const deepWorkMinutes = session.duration / 60;
  const taskScore = session.sessionScore || 0;

  const timePoints = deepWorkMinutes / formula.timeDivisor;

  return timePoints + taskScore;
}

/**
 * @description Aggregates session data by day, calculating totals for duration, count, score, and productivity points.
 * @param {Array<object>} sessions - The array of session objects from useTimer.
 * @param {object} formula - The formula configuration object.
 * @returns {Array<{date: number, totalDuration: number, sessionCount: number, totalScore: number, totalProductivityPoints: number}>}
 *          An array of objects, each representing a day with aggregated data, sorted by most recent.
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
        totalDuration: 0,
        sessionCount: 0,
        totalScore: 0,
        totalProductivityPoints: 0,
      };
    }

    acc[dateKey].totalDuration += session.duration;
    acc[dateKey].sessionCount += 1;
    acc[dateKey].totalScore += session.sessionScore || 0;
    acc[dateKey].totalProductivityPoints += calculateProductivityPoints(session, formula);

    return acc;
  }, {});

  return Object.values(dailyData).sort((a, b) => b.date - a.date);
}