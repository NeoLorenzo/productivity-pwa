// src/features/Strategy/GoalProgress.jsx

import React from 'react';
import Card from '../../components/Card';

/**
 * @description Displays progress bars for active user goals.
 * @param {{ progress: object, onEdit: () => void }} props
 */
export default function GoalProgress({ progress, onEdit }) {
  const goalLabels = {
    taskScore: 'Avg. Daily Task Score',
    timeWorked: 'Avg. Daily Time Worked (min)',
    productivityPoints: 'Avg. Daily Productivity Points',
  };

  const activeGoals = Object.entries(progress);

  const headerActions = (
    <button onClick={onEdit} className="icon-button" aria-label="Edit Goals">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
    </button>
  );

  if (activeGoals.length === 0) {
    return (
      <Card title="Goal Progress" headerActions={headerActions}>
        <p>You haven't set any active goals yet. Click the edit icon to create one!</p>
      </Card>
    );
  }

  return (
    <Card title="Goal Progress" headerActions={headerActions}>
      <div className="goal-progress-container">
        {activeGoals.map(([goalType, data]) => (
          <div key={goalType} className="progress-item">
            <div className="progress-item-header">
              <span className="progress-label">{goalLabels[goalType]}</span>
              <span className="progress-text">{`${data.current.toFixed(1)} / ${data.target}`}</span>
            </div>
            <div className="progress-bar-background">
              <div className="progress-bar-foreground" style={{ width: `${data.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}