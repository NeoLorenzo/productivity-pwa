// src/components/SettingsManager.jsx

import React from 'react';
import { FEEDBACK_FORM_URL } from '../constants';

/**
 * @description A component that provides buttons for app-wide settings, like clearing data.
 * @param {{
 *   onClearSessions: () => void,
 *   onExportSessions: () => void
 * }} props
 * @returns {JSX.Element}
 */
export default function SettingsManager({ onClearSessions, onExportSessions }) {
  const handleClearSessions = () => {
    if (window.confirm('Are you sure you want to delete all session logs? This cannot be undone.')) {
      onClearSessions();
    }
  };

  return (
    <div className="settings-manager">
      <h3>Data Management & Feedback</h3>
      <div className="settings-actions">
        <a
          href={FEEDBACK_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="button-secondary"
          style={{ textAlign: 'center' }}
        >
          Submit Feedback or a Bug
        </a>
        <button onClick={onExportSessions} className="button-secondary">
          Export Session History
        </button>
        <button onClick={handleClearSessions} className="button-danger">
          Clear Session History
        </button>
      </div>
    </div>
  );
}