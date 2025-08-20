// src/utils/formatters.js

/**
 * @description Formats a duration in seconds into a HH:MM:SS string.
 * @param {number} totalSeconds - The total duration in seconds.
 * @returns {string} The formatted time string.
 */
export function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

/**
 * @description Formats a Date object or timestamp into a locale-specific time string (e.g., "10:30:00 AM").
 * @param {Date | number} date - The date or timestamp to format.
 * @returns {string} A formatted time string.
 */
export function formatTime(date) {
  return new Date(date).toLocaleTimeString();
}

/**
 * @description Formats a Date object or timestamp into a short, readable date string (e.g., "8/19/2025").
 * @param {Date | number} date - The date or timestamp to format.
 * @returns {string} A formatted date string.
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

/**
 * @description Calculates the total duration in seconds from an array of break objects.
 * @param {Array<{startTime: number, endTime: number}>} breaks - An array of break objects.
 * @returns {number} The total duration of all breaks in seconds.
 */
export function calculateTotalBreakDuration(breaks = []) {
  if (!breaks || breaks.length === 0) {
    return 0;
  }

  const totalMilliseconds = breaks.reduce((total, currentBreak) => {
    return total + (currentBreak.endTime - currentBreak.startTime);
  }, 0);

  return Math.floor(totalMilliseconds / 1000);
}