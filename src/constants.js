// src/constants.js

/**
 * @description Centralized object for all localStorage keys.
 * This prevents typos and ensures consistency when accessing localStorage.
 */
export const LOCAL_STORAGE_KEYS = {
  SCORE: 'productivity-app-score',
  SESSIONS: 'productivity-app-sessions', // Key for storing timer sessions
};

/**
 * @description Default values for various app features.
 */
export const DEFAULTS = {
  SCORE_INCREMENT: 10, // The default number of points to add for a completed task.
};