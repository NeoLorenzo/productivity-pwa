// src/utils/sessionAggregators.js

import { formatDuration, formatDate } from './formatters';

/**
 * @description Aggregates session data by day, calculating total duration, session count, and score.
 * @param {Array<object>} sessions - The array of session objects from useTimer.
 * @returns {Array<{date: number, totalDuration: number, sessionCount: number, totalScore: number}>}
 *          An array of objects, each representing a day with aggregated data, sorted by most recent.
 */
export function aggregateSessionsByDay(sessions) {
  if (!sessions || sessions.length === 0) {
    return [];
  }

  const dailyData = sessions.reduce((acc, session) => {
    // Use toLocaleDateString with a consistent format (e.g., en-CA for YYYY-MM-DD) to group days
    // regardless of time, ensuring sessions from the same day are grouped together.
    const dateKey = new Date(session.endTime).toLocaleDateString('en-CA');

    if (!acc[dateKey]) {
      acc[dateKey] = {
        // Store the timestamp of the first session of the day for sorting and display
        date: session.endTime,
        totalDuration: 0,
        sessionCount: 0,
        totalScore: 0,
      };
    }

    acc[dateKey].totalDuration += session.duration;
    acc[dateKey].sessionCount += 1;
    acc[dateKey].totalScore += session.sessionScore || 0; // Add session score, default to 0

    return acc;
  }, {});

  // Convert the aggregated object back into an array and sort it by date descending
  return Object.values(dailyData).sort((a, b) => b.date - a.date);
}