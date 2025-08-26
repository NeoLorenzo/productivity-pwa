// src/utils/csvGenerator.jsx

import {
  formatDate,
  formatTime,
  formatDuration,
  calculateTotalBreakDuration,
} from './formatters';

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
    'Breaks Count',
    'Break Duration',
    'Notes',
    'Location (Lat,Lon)',
  ];

  const rows = sessions.map((session) => {
    const totalBreakSeconds = calculateTotalBreakDuration(session.breaks);
    
    // Gemini Note: To prevent commas within the notes from breaking the CSV structure,
    // we wrap the notes in double quotes and escape any existing double quotes inside them.
    const notes = `"${(session.notes || '').replace(/"/g, '""')}"`;
    
    const location = session.location 
      ? `${session.location.lat},${session.location.lon}` 
      : '';

    return [
      formatDate(session.endTime, dateFormat),
      formatTime(session.startTime, timeFormat),
      formatTime(session.endTime, timeFormat),
      formatDuration(session.duration),
      session.breaks?.length || 0,
      formatDuration(totalBreakSeconds),
      notes,
      location,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}