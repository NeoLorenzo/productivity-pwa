// src/constants.js

export const LOCAL_STORAGE_KEYS = {
  SCORE: 'productivity-app-score',
  SESSIONS: 'productivity-app-sessions',
  SETTINGS: 'productivity-app-settings', // New key
};

export const DEFAULTS = {
  SCORE_INCREMENT: 10,
};

// Gemini Note: Centralizing format options makes them easy to manage and reuse.
export const DATE_FORMATS = {
  DMY: 'DD/MM/YYYY',
  MDY: 'MM/DD/YYYY',
  YMD: 'YYYY/MM/DD',
};

export const TIME_FORMATS = {
  H24: '24-hour',
  H12: '12-hour',
};

export const FEEDBACK_FORM_URL = 'https://forms.gle/BA9ZQ4KC7YptJWBq7';