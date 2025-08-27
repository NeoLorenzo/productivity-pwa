// src/utils/csvGenerator.jsx

import {
  formatDate,
  formatTime,
  formatDuration,
} from './formatters';

/**
 * @description Safely wraps a string in double quotes for CSV export, escaping existing quotes.
 * @param {any} value - The value to format.
 * @returns {string}
 */
const formatCSVField = (value) => {
  const stringValue = String(value || '');
  // Escape double quotes by doubling them, then wrap the whole string in double quotes.
  return `"${stringValue.replace(/"/g, '""')}"`;
};

/**
 * @description Converts an array of session objects into a CSV formatted string.
 * @param {Array<object>} sessions - The sessions to be exported.
 * @param {string} dateFormat - The user's preferred date format.
 * @param {string} timeFormat - The user's preferred time format.
 * @returns {string} A string representing the data in CSV format.
 */
export function exportSessionsToCSV(sessions, dateFormat, timeFormat) {
  const headers = [
    'Date',
    'Start Time',
    'End Time',
    'Work Duration',
    'Session Score',
    'Completed Tasks',
    'Notes',
    'Location (Lat,Lon)',
  ];

  const rows = sessions.map((session) => {
    const completedTasks = session.completedTasks
      ?.map(task => `${task.name} (${task.score})`)
      .join('; ') || '';
      
    const location = session.location 
      ? `${session.location.lat},${session.location.lon}` 
      : '';

    // Gemini Note: Each field is now safely formatted to handle commas and quotes,
    // ensuring the CSV structure remains intact.
    return [
      formatDate(session.endTime, dateFormat),
      formatTime(session.startTime, timeFormat),
      formatTime(session.endTime, timeFormat),
      formatDuration(session.duration),
      session.sessionScore || 0,
      formatCSVField(completedTasks),
      formatCSVField(session.notes),
      location,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}