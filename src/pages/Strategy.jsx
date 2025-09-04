// src/pages/Strategy.jsx

import React, { useState } from 'react';
import TaskManager from '../features/Strategy';
import FormulaSettings from '../features/Strategy/FormulaSettings';
import GoalManagerModal from '../features/Strategy/GoalManagerModal';
import GoalProgress from '../features/Strategy/GoalProgress';
import { calculateGoalProgress } from '../utils/goalUtils';

/**
 * @description A page for managing user-defined tasks, formulas, and goals.
 */
export default function Strategy({
  formula,
  updateFormula,
  goals,
  updateGoals,
  dailySummary,
}) {
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const goalProgress = calculateGoalProgress(goals, dailySummary);

  return (
    <>
      <div className="app-layout" style={{ maxWidth: '1200px' }}>
        <div className="strategy-grid">
          <main className="strategy-main">
            <TaskManager />
          </main>
          <aside className="strategy-sidebar">
            <GoalProgress
              progress={goalProgress}
              onEdit={() => setIsGoalModalOpen(true)}
            />
            <FormulaSettings formula={formula} updateFormula={updateFormula} />
          </aside>
        </div>
      </div>
      <GoalManagerModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        goals={goals}
        updateGoals={updateGoals}
      />
    </>
  );
}