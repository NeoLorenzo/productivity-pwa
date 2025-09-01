// src/features/Tasks/index.jsx

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';
import TaskList from './TaskList';
import Card from '../../components/Card';
import TaskFormModal from './TaskFormModal';

/**
 * @description The main component for the task management feature.
 * It orchestrates the form and the list for adding, editing, and deleting tasks.
 */
export default function TaskManager() {
  const { user } = useAuth();
  const { tasks, addTask, updateTask, deleteTask } = useTasks(user?.uid);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (name, score) => {
    if (editingTask) {
      await updateTask(editingTask.id, name, score);
    } else {
      await addTask(name, score);
    }
    handleCloseModal();
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  return (
    <>
      <div className="task-manager">
        <Card
          title="Your Tasks"
          className="no-padding"
          headerActions={
            <button onClick={handleOpenAddModal} className="icon-button" aria-label="Add Task">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          }
        >
          <TaskList
            tasks={tasks}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
          />
        </Card>
      </div>
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingTask={editingTask}
      />
    </>
  );
}