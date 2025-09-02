// src/features/Strategy/GoalManager.jsx

import React, { useState, useEffect } from 'react';

/**
 * @description A component for setting and managing average-based productivity goals.
 * @param {{
 *   goals: object,
 *   updateGoals: (newGoals: object) => void,
 *   onClose: () => void
 * }} props
 */
export default function GoalManager({ goals, updateGoals, onClose }) {
  const [localGoals, setLocalGoals] = useState(goals);

  useEffect(() => {
    setLocalGoals(goals);
  }, [goals]);

  const handleInputChange = (goalType, field, value) => {
    // Clear the entire goal object if the target is cleared
    if (field === 'target' && (value === '' || value <= 0)) {
      setLocalGoals(prev => ({
        ...prev,
        [goalType]: { target: null, endDate: null },
      }));
      return;
    }

    setLocalGoals(prev => ({
      ...prev,
      [goalType]: {
        ...prev[goalType],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    updateGoals(localGoals);
    alert('Goals saved successfully!');
    onClose();
  };

  const goalTypes = [
    { key: 'taskScore', label: 'Average Daily Task Score', unit: 'points' },
    { key: 'timeWorked', label: 'Average Daily Time Worked', unit: 'minutes' },
    { key: 'productivityPoints', label: 'Average Daily Productivity Points', unit: 'points' },
  ];

  return (
    <div className="goal-manager">
      <div className="goal-form">
        {goalTypes.map(({ key, label, unit }) => (
          <div key={key} className="goal-input-group">
            <label>{label}</label>
            <div className="goal-inputs">
              <input
                type="number"
                placeholder={`Target ${unit}`}
                min="0"
                value={localGoals[key]?.target || ''}
                onChange={(e) => handleInputChange(key, 'target', Number(e.target.value))}
              />
              <input
                type="date"
                value={localGoals[key]?.endDate || ''}
                onChange={(e) => handleInputChange(key, 'endDate', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="goal-form-helper">
        Set a target daily average and an end date. Progress is tracked from today until the goal's end. Clear a target to disable the goal.
      </p>
      <div className="modal-actions">
        <button onClick={onClose} className="button-secondary">Cancel</button>
        <button onClick={handleSave} className="button-primary">Save Goals</button>
      </div>
    </div>
  );
}