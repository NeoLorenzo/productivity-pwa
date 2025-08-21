import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import SessionLog from './SessionLog';
import SessionNotesModal from '../../components/SessionNotesModal';
import SessionImporter from './SessionImporter'; // Import the new component

/**
 * @description A self-contained feature component for the timer system.
 */
export default function Timer() {
  const {
    elapsedTime,
    isActive,
    isPaused,
    sessions,
    startTimer,
    pauseTimer,
    stopTimer,
    pendingSession,
    saveSessionWithNotes,
    discardPendingSession,
    importSessions, // Get the new import function from the hook
  } = useTimer();

  const handleSaveSession = (notes) => {
    saveSessionWithNotes(notes);
  };

  return (
    <div className="timer-feature">
      <h2>Focus Timer</h2>
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

      <SessionLog sessions={sessions} />

      {/* Gemini Note: The new importer component is placed here. */}
      {/* It receives the `importSessions` function to update the state. */}
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