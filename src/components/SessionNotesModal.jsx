// src/components/SessionNotesModal.jsx

import React from 'react';
import { useState, useEffect } from 'react';

/**
 * @description A modal to prompt the user for session notes and location.
 * @param {{
 *   isOpen: boolean,
 *   onSubmit: (sessionData: { notes: string, location: object | null }) => void,
 *   onClose: () => void
 * }} props
 * @returns {JSX.Element | null}
 */
export default function SessionNotesModal({ isOpen, onSubmit, onClose }) {
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Gemini Note: This effect ensures that when the modal is re-opened, all state
  // is reset, preventing stale data from being shown.
  useEffect(() => {
    if (isOpen) {
      setNotes('');
      setLocation(null);
      setIsFetchingLocation(false);
      setLocationError('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

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
    onSubmit({ notes, location });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Session Complete</h2>
        <p>What did you work on during this session?</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Refactored the useTimer hook, fixed bug #123..."
            rows="4"
            autoFocus
          ></textarea>

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