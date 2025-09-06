// src/components/SettingsModal.jsx

import React from 'react';
import Card from './Card';
import DisplaySettings from './DisplaySettings';
import SettingsManager from './SettingsManager';
import SessionImporter from '../features/Timer/SessionImporter';
import IntegrationsManager from './IntegrationsManager';

/**
 * @description A modal for managing all application settings.
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   settings: { dateFormat: string, timeFormat: string },
 *   updateDateFormat: (format: string) => void,
 *   updateTimeFormat: (format: string) => void,
 *   onClearSessions: () => void,
 *   onExportSessions: () => void,
 *   onImportSessions: (csvText: string) => void,
 *   integrations: object,
 *   onLinkGitHub: () => void,
 *   onUnlinkGitHub: () => void
 * }} props
 * @returns {JSX.Element | null}
 */
export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  updateDateFormat,
  updateTimeFormat,
  onClearSessions,
  onExportSessions,
  onImportSessions,
  integrations,
  onLinkGitHub,
  onUnlinkGitHub,
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
              onClearSessions={onClearSessions}
              onExportSessions={onExportSessions}
            />
          </Card>

          <Card title="Import Data">
            <SessionImporter onImport={onImportSessions} />
          </Card>

          <Card title="Integrations">
            <IntegrationsManager
              integrations={integrations}
              onLinkGitHub={onLinkGitHub}
              onUnlinkGitHub={onUnlinkGitHub}
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