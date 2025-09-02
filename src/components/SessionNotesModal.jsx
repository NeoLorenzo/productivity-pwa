// src/components/SessionNotesModal.jsx

import React from 'react';
import { useState, useEffect } from 'react';

/**
 * @description A modal to prompt for session notes, location, and completed tasks.
 * @param {{
 *   isOpen: boolean,
 *   tasks: Array<{id: string, name: string, score: number}>,
 *   onSubmit: (sessionData: { notes: string, location: object | null, completedTasks: Array<object> }) => void,
 *   onClose: () => void,
 *   sessionType: 'productivity' | 'play'
 * }} props
 * @returns {JSX.Element | null}
 */
export default function SessionNotesModal({ isOpen, tasks = [], onSubmit, onClose, sessionType }) {
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Gemini Note: This effect ensures that when the modal is re-opened, all state
  // is reset, preventing stale data from being shown.
  useEffect(() => {
    if (isOpen) {
      setNotes('');
      setLocation(null);
      setSelectedTasks(new Set());
      setIsFetchingLocation(false);
      setLocationError('');
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

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsFetchingLocation(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setIsFetchingLocation(false);
      },
      (error) => {
        setLocationError(`Error fetching location: ${error.message}`);
        setIsFetchingLocation(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completedTasks = tasks.filter(task => selectedTasks.has(task.id));
    onSubmit({ notes, location, completedTasks });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Session Complete</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Gemini Note: Conditionally render task and location inputs for productivity sessions only. */}
          {sessionType === 'productivity' && (
            <>
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
            </>
          )}

          <p>Add any additional notes for this session:</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Refactored the useTimer hook, fixed bug #123..."
            rows="4"
            autoFocus
          ></textarea>

          {sessionType === 'productivity' && (
            <div className="location-controls">
              <button
                type="button"
                onClick={handleFetchLocation}
                disabled={isFetchingLocation || !!location}
                className="button-secondary"
              >
                {isFetchingLocation ? 'Fetching...' : 'Add Location'}
              </button>
              {location && (
                <p className="location-status">
                  Location captured: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                </p>
              )}
              {locationError && <p className="location-status error">{locationError}</p>}
            </div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="button-secondary">
              Skip
            </button>
            <button type="submit" className="button-primary">
              Save Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}