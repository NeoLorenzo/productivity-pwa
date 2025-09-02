// src/features/Strategy/GoalManagerModal.jsx

import React from 'react';
import GoalManager from './GoalManager';

/**
 * @description A modal for setting and managing user goals.
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   goals: object,
 *   updateGoals: (newGoals: object) => void
 * }} props
 */
export default function GoalManagerModal({ isOpen, onClose, goals, updateGoals }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content goal-manager-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Set Your Goals</h2>
        <GoalManager
          goals={goals}
          updateGoals={updateGoals}
          onClose={onClose}
        />
      </div>
    </div>
  );
}