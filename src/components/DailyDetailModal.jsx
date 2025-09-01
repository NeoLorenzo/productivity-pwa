// src/components/DailyDetailModal.jsx

import React, { useState } from 'react';
import SessionLog from '../features/Timer/SessionLog';
import EditSessionModal from './EditSessionModal';
import { formatDate } from '../utils/formatters';

/**
 * @description A modal to display and manage all sessions for a single day.
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   dayData: object,
 *   sessionsForDay: Array<object>,
 *   dateFormat: string,
 *   timeFormat: string,
 *   tasks: Array<object>,
 *   deleteSessions: (sessionIds: Array<string>) => void,
 *   updateSession: (sessionId: string, updatedData: object) => void
 * }} props
 * @returns {JSX.Element | null}
 */
export default function DailyDetailModal({
  isOpen,
  onClose,
  dayData,
  sessionsForDay,
  dateFormat,
  timeFormat,
  tasks,
  deleteSessions,
  updateSession,
}) {
  const [selectedSessions, setSelectedSessions] = useState(new Set());
  const [sessionToEdit, setSessionToEdit] = useState(null);

  if (!isOpen) return null;

  const handleSessionSelect = (sessionId) => {
    setSelectedSessions((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(sessionId)) newSelected.delete(sessionId);
      else newSelected.add(sessionId);
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectedSessions.size === sessionsForDay.length) {
      setSelectedSessions(new Set());
    } else {
      setSelectedSessions(new Set(sessionsForDay.map((s) => s.id)));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedSessions.size === 0) return;
    if (window.confirm(`Delete ${selectedSessions.size} session(s)?`)) {
      deleteSessions(Array.from(selectedSessions));
      setSelectedSessions(new Set());
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content daily-detail-modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>History for {formatDate(dayData.date, dateFormat)}</h2>
          
          <div className="modal-scroll-content">
            {selectedSessions.size > 0 && (
              <div className="history-page-controls modal-controls">
                <button onClick={handleDeleteSelected} className="button-danger">
                  Delete Selected ({selectedSessions.size})
                </button>
              </div>
            )}
            <SessionLog
              sessions={sessionsForDay}
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              selectedSessions={selectedSessions}
              onSessionSelect={handleSessionSelect}
              onSelectAll={handleSelectAll}
              onEditSession={setSessionToEdit}
            />
          </div>

          <div className="modal-actions">
            <button onClick={onClose} className="button-primary">Close</button>
          </div>
        </div>
      </div>
      <EditSessionModal
        isOpen={!!sessionToEdit}
        onClose={() => setSessionToEdit(null)}
        sessionToEdit={sessionToEdit}
        tasks={tasks}
        onSubmit={updateSession}
      />
    </>
  );
}