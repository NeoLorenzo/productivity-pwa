// src/features/Tasks/index.jsx

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Card from '../../components/Card';

/**
 * @description The main component for the task management feature.
 * It orchestrates the form and the list for adding, editing, and deleting tasks.
 */
export default function TaskManager() {
  const { user } = useAuth();
  const { tasks, addTask, updateTask, deleteTask } = useTasks(user?.uid);
  const [editingTask, setEditingTask] = useState(null); // State to hold the task being edited

  const handleAddTask = async (name, score) => {
    await addTask(name, score);
  };

  const handleUpdateTask = async (taskId, name, score) => {
    await updateTask(taskId, name, score);
    setEditingTask(null); // Clear editing state after update
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="task-manager">
      <Card title={editingTask ? 'Edit Task' : 'Add a New Task'}>
        <TaskForm
          onSubmit={editingTask ? (name, score) => handleUpdateTask(editingTask.id, name, score) : handleAddTask}
          editingTask={editingTask}
          onCancelEdit={handleCancelEdit}
        />
      </Card>
      <Card title="Your Tasks">
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDeleteTask}
        />
      </Card>
    </div>
  );
}