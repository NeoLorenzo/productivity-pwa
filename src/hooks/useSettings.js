// src/hooks/useSettings.jsx

import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS, DATE_FORMATS, TIME_FORMATS } from '../constants';

const defaultSettings = {
  dateFormat: DATE_FORMATS.DMY,
  timeFormat: TIME_FORMATS.H24,
};

/**
 * @description A custom hook to manage user display settings.
 * @returns {{
 *   settings: { dateFormat: string, timeFormat: string },
 *   updateDateFormat: (format: string) => void,
 *   updateTimeFormat: (format: string) => void
 * }}
 */
export function useSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    } catch (error) {
      console.error('Failed to parse settings from localStorage', error);
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const updateDateFormat = (format) => {
    if (Object.values(DATE_FORMATS).includes(format)) {
      setSettings((prev) => ({ ...prev, dateFormat: format }));
    }
  };

  const updateTimeFormat = (format) => {
    if (Object.values(TIME_FORMATS).includes(format)) {
      setSettings((prev) => ({ ...prev, timeFormat: format }));
    }
  };

  return { settings, updateDateFormat, updateTimeFormat };
}