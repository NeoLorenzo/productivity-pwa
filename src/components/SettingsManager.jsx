// src/components/SettingsManager.jsx

import React from 'react';

/**
 * @description A component that provides buttons for app-wide settings, like clearing data.
 * @param {{
 *   onClearScore: () => void,
 *   onClearSessions: () => void
 * }} props
 * @returns {JSX.Element}
 */
export default function SettingsManager({ onClearScore, onClearSessions }) {
  const handleClearScore = () => {
    // Gemini Note: window.confirm() is a simple way to ask for user confirmation.
    // The action only proceeds if the user clicks "OK".
    if (window.confirm('Are you sure you want to reset your score to 0? This cannot be undone.')) {
      onClearScore();
    }
  };

  const handleClearSessions = () => {
    if (window.confirm('Are you sure you want to delete all session logs? This cannot be undone.')) {
      onClearSessions();
    }
  };

  return (
    <div className="settings-manager">
      <h3>Settings</h3>
      <div className="settings-actions">
        <button onClick={handleClearScore} className="button-danger">
          Clear Score
        </button>
        <button onClick={handleClearSessions} className="button-danger">
          Clear Session History
        </button>
      </div>
    </div>
  );
}