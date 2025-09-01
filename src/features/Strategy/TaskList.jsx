// src/features/Strategy/TaskList.jsx

import React from 'react';

/**
 * @description Displays a list of tasks with options to edit or delete.
 * @param {{
 *   tasks: Array<{id: string, name: string, score: number}>,
 *   onEdit: (task: object) => void,
 *   onDelete: (taskId: string) => void
 * }} props
 */
export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>You haven't added any tasks yet.</p>
        <small>Use the form above to create your first task!</small>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <div className="task-details">
            <span className="task-name">{task.name}</span>
          </div>
          <div className="task-meta">
            <span className="task-score-pill">+{task.score}</span>
            <div className="task-actions">
              {/* Gemini Note: Replaced text buttons with more appealing SVG icons. */}
              <button
                onClick={() => onEdit(task)}
                className="icon-button"
                aria-label="Edit Task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="icon-button danger"
                aria-label="Delete Task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}