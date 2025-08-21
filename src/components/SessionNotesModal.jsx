import React from 'react';
import { useState, useEffect } from 'react';

/**
 * @description A modal to prompt the user for session notes.
 * @param {{
 *   isOpen: boolean,
 *   onSubmit: (notes: string) => void,
 *   onClose: () => void
 * }} props
 * @returns {JSX.Element | null}
 */
export default function SessionNotesModal({ isOpen, onSubmit, onClose }) {
  const [notes, setNotes] = useState('');

  // Gemini Note: This effect ensures that when the modal is re-opened for a new session,
  // the text area is cleared, preventing stale data from being shown.
  useEffect(() => {
    if (isOpen) {
      setNotes('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(notes);
  };

  // Gemini Note: The outer div `modal-overlay` handles clicks to close the modal,
  // while `e.stopPropagation()` on the inner `modal-content` div prevents the modal
  // from closing when the user clicks inside it.
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