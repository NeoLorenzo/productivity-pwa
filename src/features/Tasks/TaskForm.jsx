// src/features/Tasks/TaskForm.jsx

import React, { useState, useEffect } from 'react';

/**
 * @description A form for adding or editing a task.
 * @param {{
 *   onSubmit: (name: string, score: number) => void,
 *   editingTask: { id: string, name: string, score: number } | null,
 *   onCancelEdit: () => void
 * }} props
 */
export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);

  // Gemini Note: This effect populates the form when a task is selected for editing.
  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setScore(editingTask.score);
    } else {
      // Reset form when not in edit mode
      setName('');
      setScore(0);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || score < 0) {
      alert('Please provide a valid task name and a non-negative score.');
      return;
    }
    onSubmit(name, parseInt(score, 10));
    // Reset form only if we are not in edit mode (edit mode reset is handled by parent)
    if (!editingTask) {
      setName('');
      setScore(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-controls">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task Name (e.g., Write 500 words)"
          required
        />
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Score"
          min="0"
          required
        />
        <button type="submit" className="button-primary">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" onClick={onCancelEdit} className="button-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}