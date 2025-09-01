// src/features/Tasks/TaskFormModal.jsx

import React from 'react';
import TaskForm from './TaskForm';

/**
 * @description A modal for adding or editing a task.
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   onSubmit: (name: string, score: number) => void,
 *   editingTask: { id: string, name: string, score: number } | null
 * }} props
 */
export default function TaskFormModal({ isOpen, onClose, onSubmit, editingTask }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{editingTask ? 'Edit Task' : 'Add a New Task'}</h2>
        
        <TaskForm
          onSubmit={onSubmit}
          editingTask={editingTask}
          onCancelEdit={onClose}
        />
      </div>
    </div>
  );
}