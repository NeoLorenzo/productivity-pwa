// src/features/Timer/index.jsx

import React from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import DailySummary from './DailySummary';
import SessionLog from './SessionLog';
import SessionNotesModal from '../../components/SessionNotesModal';
import SessionImporter from './SessionImporter';

/**
 * @description A self-contained feature component for the timer system.
 * It receives all state and handlers as props from a parent component.
 */
export default function Timer({
  elapsedTime,
  isActive,
  isPaused,
  sessions,
  dailySummary,
  dateFormat,
  timeFormat,
  pendingSession,
  startTimer,
  pauseTimer,
  stopTimer,
  saveSessionWithNotes,
  discardPendingSession,
  importSessions,
}) {
  const handleSaveSession = (notes) => {
    saveSessionWithNotes(notes);
  };

  return (
    <div className="timer-feature">
      <TimerDisplay elapsedTime={elapsedTime} />

      {!pendingSession && (
        <TimerControls
          isActive={isActive}
          isPaused={isPaused}
          onStart={startTimer}
          onPause={pauseTimer}
          onStop={stopTimer}
        />
      )}

      <DailySummary dailySummary={dailySummary} dateFormat={dateFormat} />

      <SessionLog
        sessions={sessions}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
      />

      <div className="importer-container">
        <SessionImporter onImport={importSessions} />
      </div>

      <SessionNotesModal
        isOpen={!!pendingSession}
        onSubmit={handleSaveSession}
        onClose={discardPendingSession}
      />
    </div>
  );
}