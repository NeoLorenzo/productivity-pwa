// src/pages/History.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import DailySummary from '../features/Timer/DailySummary';
import SessionLog from '../features/Timer/SessionLog';
import EditSessionModal from '../components/EditSessionModal';
import DailyDetailModal from '../components/DailyDetailModal';

/**
 * @description A page dedicated to displaying session history and summaries.
 */
export default function History({
  sessions,
  dailySummary,
  dateFormat,
  timeFormat,
  tasks,
  isMobile,
  deleteSessions,
  updateSession,
}) {
  // State for the main desktop log
  const [selectedSessions, setSelectedSessions] = useState(new Set());
  const [sessionToEdit, setSessionToEdit] = useState(null);
  
  // State for the mobile detail modal
  const [detailDay, setDetailDay] = useState(null);

  const handleSessionSelect = (sessionId) => {
    setSelectedSessions((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(sessionId)) newSelected.delete(sessionId);
      else newSelected.add(sessionId);
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectedSessions.size === sessions.length) {
      setSelectedSessions(new Set());
    } else {
      setSelectedSessions(new Set(sessions.map((s) => s.id)));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedSessions.size === 0) return;
    if (window.confirm(`Delete ${selectedSessions.size} session(s)?`)) {
      deleteSessions(Array.from(selectedSessions));
      setSelectedSessions(new Set());
    }
  };

  const handleUpdateSession = async (sessionId, updatedData) => {
    await updateSession(sessionId, updatedData);
  };

  // Filter sessions for the selected day to pass to the modal
  const sessionsForDetailDay = detailDay
    ? sessions.filter(
        (s) =>
          new Date(s.endTime).toLocaleDateString('en-CA') ===
          new Date(detailDay.date).toLocaleDateString('en-CA')
      )
    : [];

  return (
    <>
      <div className="app-layout" style={{ maxWidth: '1000px' }}>
        <Card title="Session History">
          {!isMobile && (
            <div className="history-page-controls">
              <Link to="/" className="button-secondary">
                ← Back to Timer
              </Link>
              {selectedSessions.size > 0 && (
                <button onClick={handleDeleteSelected} className="button-danger">
                  Delete Selected ({selectedSessions.size})
                </button>
              )}
            </div>
          )}
          <DailySummary
            dailySummary={dailySummary}
            dateFormat={dateFormat}
            isMobile={isMobile}
            onDayClick={(day) => setDetailDay(day)}
          />
          {!isMobile && (
            <SessionLog
              sessions={sessions}
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              selectedSessions={selectedSessions}
              onSessionSelect={handleSessionSelect}
              onSelectAll={handleSelectAll}
              onEditSession={setSessionToEdit}
            />
          )}
        </Card>
      </div>

      {/* Modals are rendered outside the main layout */}
      {!isMobile && (
        <EditSessionModal
          isOpen={!!sessionToEdit}
          onClose={() => setSessionToEdit(null)}
          sessionToEdit={sessionToEdit}
          tasks={tasks}
          onSubmit={handleUpdateSession}
        />
      )}

      {isMobile && (
        <DailyDetailModal
          isOpen={!!detailDay}
          onClose={() => setDetailDay(null)}
          dayData={detailDay}
          sessionsForDay={sessionsForDetailDay}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          tasks={tasks}
          deleteSessions={deleteSessions}
          updateSession={updateSession}
        />
      )}
    </>
  );
}