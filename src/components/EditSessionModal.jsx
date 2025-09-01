// src/components/EditSessionModal.jsx

import React, { useState, useEffect } from 'react';

/**
 * @description A modal for editing an existing session.
 * @param {{
 *   isOpen: boolean,
 *   sessionToEdit: object | null,
 *   tasks: Array<{id: string, name: string, score: number}>,
 *   onSubmit: (sessionId: string, sessionData: object) => void,
 *   onClose: () => void
 * }} props
 * @returns {JSX.Element | null}
 */
export default function EditSessionModal({ isOpen, sessionToEdit, tasks = [], onSubmit, onClose }) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  // Gemini Note: This effect populates the form with the session's data
  // whenever a new session is selected for editing.
  useEffect(() => {
    if (isOpen && sessionToEdit) {
      const startDate = new Date(sessionToEdit.startTime);
      setDate(startDate.toLocaleDateString('en-CA')); // YYYY-MM-DD
      setStartTime(startDate.toTimeString().substring(0, 5)); // HH:MM
      
      const endDate = new Date(sessionToEdit.endTime);
      setEndTime(endDate.toTimeString().substring(0, 5)); // HH:MM

      setNotes(sessionToEdit.notes || '');
      
      const initialSelectedTasks = new Set(
        (sessionToEdit.completedTasks || []).map(task => task.id)
      );
      setSelectedTasks(initialSelectedTasks);
    }
  }, [isOpen, sessionToEdit]);

  if (!isOpen || !sessionToEdit) {
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
    const sessionScore = completedTasks.reduce((total, task) => total + task.score, 0);

    const startTimestamp = new Date(`${date}T${startTime}`).getTime();
    const endTimestamp = new Date(`${date}T${endTime}`).getTime();
    const duration = Math.floor((endTimestamp - startTimestamp) / 1000);

    onSubmit(sessionToEdit.id, {
      startTime: startTimestamp,
      endTime: endTimestamp,
      duration: duration > 0 ? duration : 0,
      notes,
      completedTasks,
      sessionScore,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Session</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="quick-add-form-controls">
            <div className="setting-option">
              <label htmlFor="session-date-edit">Date *</label>
              <input
                type="date"
                id="session-date-edit"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="setting-option">
              <label htmlFor="session-start-time-edit">Start Time</label>
              <input
                type="time"
                id="session-start-time-edit"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="setting-option">
              <label htmlFor="session-end-time-edit">End Time</label>
              <input
                type="time"
                id="session-end-time-edit"
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
              Update Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}