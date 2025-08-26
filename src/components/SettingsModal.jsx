// src/components/SettingsModal.jsx

import React from 'react';
import Card from './Card';
import DisplaySettings from './DisplaySettings';
import SettingsManager from './SettingsManager';

/**
 * @description A modal for managing all application settings.
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   settings: { dateFormat: string, timeFormat: string },
 *   updateDateFormat: (format: string) => void,
 *   updateTimeFormat: (format: string) => void,
 *   onClearScore: () => void,
 *   onClearSessions: () => void
 * }} props
 * @returns {JSX.Element | null}
 */
export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  updateDateFormat,
  updateTimeFormat,
  onClearScore,
  onClearSessions,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>
        
        <div className="settings-modal-content">
          <Card>
            <DisplaySettings
              currentDateFormat={settings.dateFormat}
              currentTimeFormat={settings.timeFormat}
              onDateFormatChange={updateDateFormat}
              onTimeFormatChange={updateTimeFormat}
            />
          </Card>
          
          <Card>
            <SettingsManager
              onClearScore={onClearScore}
              onClearSessions={onClearSessions}
            />
          </Card>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="button-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}