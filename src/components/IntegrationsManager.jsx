// src/components/IntegrationsManager.jsx

import React from 'react';

/**
 * @description A component for managing third-party integrations.
 * @param {{
 *   integrations: object,
 *   onLinkGitHub: () => void,
 *   onUnlinkGitHub: () => void
 * }} props
 * @returns {JSX.Element}
 */
export default function IntegrationsManager({ integrations, onLinkGitHub, onUnlinkGitHub }) {
  const { github } = integrations;

  return (
    <div className="integrations-manager">
      <div className="integration-item">
        <div className="integration-details">
          <h4>GitHub</h4>
          <p>Automatically track productivity points from your commit history.</p>
          {github.linked && (
            <div className="integration-status">
              Connected as: <strong>{github.username}</strong>
            </div>
          )}
        </div>
        <div className="integration-actions">
          {github.linked ? (
            <button onClick={onUnlinkGitHub} className="button-danger">
              Disconnect
            </button>
          ) : (
            <button onClick={onLinkGitHub} className="button-secondary">
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}