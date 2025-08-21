// src/components/DisplaySettings.jsx

import React from 'react';
import { DATE_FORMATS, TIME_FORMATS } from '../constants';

/**
 * @description A component for changing date and time display formats.
 * @param {{
 *   currentDateFormat: string,
 *   currentTimeFormat: string,
 *   onDateFormatChange: (format: string) => void,
 *   onTimeFormatChange: (format: string) => void
 * }} props
 * @returns {JSX.Element}
 */
export default function DisplaySettings({
  currentDateFormat,
  currentTimeFormat,
  onDateFormatChange,
  onTimeFormatChange,
}) {
  return (
    <div className="display-settings">
      <h3>Display Options</h3>
      <div className="settings-controls">
        <div className="setting-option">
          <label htmlFor="date-format-select">Date Format</label>
          <select
            id="date-format-select"
            value={currentDateFormat}
            onChange={(e) => onDateFormatChange(e.target.value)}
          >
            {Object.entries(DATE_FORMATS).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="setting-option">
          <label htmlFor="time-format-select">Time Format</label>
          <select
            id="time-format-select"
            value={currentTimeFormat}
            onChange={(e) => onTimeFormatChange(e.target.value)}
          >
            {Object.entries(TIME_FORMATS).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}