// src/features/Tasks/TaskList.jsx

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
    return <p>No tasks defined yet. Add one above to get started!</p>;
  }

  return (
    <div className="task-list session-log">
      <h3>Your Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.score}</td>
              <td className="task-actions">
                <button onClick={() => onEdit(task)} className="button-secondary">
                  Edit
                </button>
                <button onClick={() => onDelete(task.id)} className="button-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}