// src/utils/formatters.js

import { DATE_FORMATS, TIME_FORMATS } from '../constants';

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
 * @description Formats a Date object or timestamp into a time string based on the specified format.
 * @param {Date | number} date - The date or timestamp to format.
 * @param {string} format - The desired time format (e.g., '12-hour', '24-hour').
 * @returns {string} A formatted time string.
 */
export function formatTime(date, format = TIME_FORMATS.H24) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: format === TIME_FORMATS.H12,
  };
  // Using an empty array for locales allows the browser to use its default,
  // while we enforce the 12/24 hour format via options.
  return new Date(date).toLocaleTimeString([], options);
}

/**
 * @description Formats a Date object or timestamp into a date string based on the specified format.
 * @param {Date | number} date - The date or timestamp to format.
 * @param {string} format - The desired date format (e.g., 'DD/MM/YYYY').
 * @returns {string} A formatted date string.
 */
export function formatDate(date, format = DATE_FORMATS.DMY) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = d.getFullYear();

  switch (format) {
    case DATE_FORMATS.MDY:
      return `${month}/${day}/${year}`;
    case DATE_FORMATS.YMD:
      return `${year}/${month}/${day}`;
    case DATE_FORMATS.DMY:
    default:
      return `${day}/${month}/${year}`;
  }
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