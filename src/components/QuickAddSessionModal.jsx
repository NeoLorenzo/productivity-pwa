// src/components/QuickAddSessionModal.jsx

import React, { useState, useEffect } from 'react';

/**
 * @description A modal for manually adding a session without using the timer.
 * @param {{
 *   isOpen: boolean,
 *   tasks: Array<{id: string, name: string, score: number}>,
 *   onSubmit: (sessionData: { date: string, startTime: string, endTime: string, notes: string, completedTasks: Array<object> }) => void,
 *   onClose: () => void
 * }} props
 * @returns {JSX.Element | null}
 */
export default function QuickAddSessionModal({ isOpen, tasks = [], onSubmit, onClose }) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  // Gemini Note: This effect resets the form state and sets the default
  // date to today whenever the modal is opened.
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
      setDate(today);
      setStartTime('');
      setEndTime('');
      setNotes('');
      setSelectedTasks(new Set());
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleTaskToggle = (taskId) => {
    setSelectedTasks((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(taskId)) {
        newSelected.delete(taskId);
      } else {
        newSelected.add(taskId);
      }
      return newSelected;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) {
      alert('Please select a date for the session.');
      return;
    }
    if (startTime && endTime && startTime >= endTime) {
      alert('End time must be after start time.');
      return;
    }

    const completedTasks = tasks.filter(task => selectedTasks.has(task.id));
    onSubmit({ date, startTime, endTime, notes, completedTasks });
    onClose(); // Close modal on successful submission
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Quick Add Session</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="quick-add-form-controls">
            <div className="setting-option">
              <label htmlFor="session-date">Date *</label>
              <input
                type="date"
                id="session-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="setting-option">
              <label htmlFor="session-start-time">Start Time</label>
              <input
                type="time"
                id="session-start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="setting-option">
              <label htmlFor="session-end-time">End Time</label>
              <input
                type="time"
                id="session-end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {tasks.length > 0 && (
            <div className="task-selection-container">
              <p>What tasks did you complete?</p>
              <div className="task-checklist">
                {tasks.map((task) => (
                  <label key={task.id} className="task-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedTasks.has(task.id)}
                      onChange={() => handleTaskToggle(task.id)}
                    />
                    {task.name} (+{task.score})
                  </label>
                ))}
              </div>
            </div>
          )}

          <p>Add any additional notes for this session:</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Worked on the project design document."
            rows="3"
          ></textarea>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="button-secondary">
              Cancel
            </button>
            <button type="submit" className="button-primary">
              Add Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}