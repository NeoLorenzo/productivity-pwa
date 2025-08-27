// src/features/Timer/index.jsx

import React from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
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
  pendingSession,
  tasks,
  startTimer,
  pauseTimer,
  stopTimer,
  saveSession,
  discardPendingSession,
  importSessions,
}) {
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

      <div className="importer-container">
        <SessionImporter onImport={importSessions} />
      </div>

      <SessionNotesModal
        isOpen={!!pendingSession}
        tasks={tasks}
        onSubmit={saveSession}
        onClose={discardPendingSession}
      />
    </div>
  );
}