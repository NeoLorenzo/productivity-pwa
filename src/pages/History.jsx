// src/pages/History.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import DailySummary from '../features/Timer/DailySummary';
import SessionLog from '../features/Timer/SessionLog';

/**
 * @description A page dedicated to displaying session history and summaries.
 */
export default function History({
  sessions,
  dailySummary,
  dateFormat,
  timeFormat,
  onOpenSettings,
  deleteSessions,
}) {
  const [selectedSessions, setSelectedSessions] = useState(new Set());

  const handleSessionSelect = (sessionId) => {
    setSelectedSessions((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(sessionId)) {
        newSelected.delete(sessionId);
      } else {
        newSelected.add(sessionId);
      }
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectedSessions.size === sessions.length) {
      setSelectedSessions(new Set()); // Deselect all
    } else {
      const allSessionIds = new Set(sessions.map((s) => s.id));
      setSelectedSessions(allSessionIds); // Select all
    }
  };

  const handleDeleteSelected = () => {
    if (selectedSessions.size === 0) return;
    const confirmation = window.confirm(
      `Are you sure you want to delete ${selectedSessions.size} session(s)? This cannot be undone.`
    );
    if (confirmation) {
      deleteSessions(Array.from(selectedSessions));
      setSelectedSessions(new Set()); // Clear selection after deletion
    }
  };

  return (
    <div className="app-container">
      <Header onOpenSettings={onOpenSettings} title="History" />
      <div className="app-layout" style={{ maxWidth: '1000px' }}>
        <Card title="Session History">
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
          <DailySummary dailySummary={dailySummary} dateFormat={dateFormat} />
          <SessionLog
            sessions={sessions}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            selectedSessions={selectedSessions}
            onSessionSelect={handleSessionSelect}
            onSelectAll={handleSelectAll}
          />
        </Card>
      </div>
    </div>
  );
}