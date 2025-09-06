// src/features/Strategy/GitHubSettings.jsx

import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';

/**
 * @description A component for editing GitHub integration settings.
 * @param {{
 *   githubSettings: { linesOfCodeScore: number },
 *   updateGithubSettings: (newSettings: object) => void
 * }} props
 */
export default function GitHubSettings({ githubSettings, updateGithubSettings }) {
  const [localSettings, setLocalSettings] = useState(githubSettings);

  useEffect(() => {
    setLocalSettings(githubSettings);
  }, [githubSettings]);

  const handleInputChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdate = (key) => {
    const newScore = parseFloat(localSettings[key]);
    if (!isNaN(newScore) && newScore >= 0) {
      updateGithubSettings({ ...githubSettings, [key]: newScore });
    } else {
      alert('Please enter a valid, non-negative number.');
      setLocalSettings(githubSettings); // Reset on invalid input
    }
  };

  return (
    <Card title="GitHub Integration">
      <div className="formula-group">
        <div className="formula-display-wrapper">
          <div className="formula-display">
            <span>1 Line of Code =</span>
            <input
              type="number"
              value={localSettings.linesOfCodeScore}
              onChange={(e) => handleInputChange('linesOfCodeScore', e.target.value)}
              onBlur={() => handleUpdate('linesOfCodeScore')}
              className="formula-input"
              min="0"
              step="0.1"
            />
            <span>Task Score Points</span>
          </div>
        </div>
        <p className="formula-explanation">
          Set the value for each line of code added in your commits. This will be used to automatically create sessions from your GitHub activity.
        </p>
      </div>
    </Card>
  );
}