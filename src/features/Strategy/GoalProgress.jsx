// src/features/Strategy/GoalProgress.jsx

import React from 'react';
import Card from '../../components/Card';

/**
 * @description Displays progress bars for active user goals.
 * @param {{ progress: object }} props
 */
export default function GoalProgress({ progress }) {
  const goalLabels = {
    taskScore: 'Avg. Daily Task Score',
    timeWorked: 'Avg. Daily Time Worked (min)',
    productivityPoints: 'Avg. Daily Productivity Points',
  };

  const activeGoals = Object.entries(progress);

  if (activeGoals.length === 0) {
    return (
      <Card title="Goal Progress">
        <p>You haven't set any active goals yet. Use the form below to create one!</p>
      </Card>
    );
  }

  return (
    <Card title="Goal Progress">
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