// src/pages/TimerPage.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
import TimerDisplay from '../features/Timer/TimerDisplay';
import TimerControls from '../features/Timer/TimerControls';
import SessionNotesModal from '../components/SessionNotesModal';
import TimerModeToggle from '../components/TimerModeToggle';
import QuickAddSessionModal from '../components/QuickAddSessionModal';

/**
 * @description The main timer page, serving as the app's landing page.
 */
export default function TimerPage({ timer, tasks, onOpenSettings, timerMode, onTimerModeChange }) {
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);

  const {
    elapsedTime,
    isActive,
    isPaused,
    pendingSession,
    startTimer,
    pauseTimer,
    stopTimer,
    saveSession,
    discardPendingSession,
    addManualSession,
  } = timer;

  // Gemini Note: This function determines the visual state of the timer page
  // based on its mode and activity, used for dynamic styling.
  const getTimerPageClassName = () => {
    if (isActive && !isPaused) {
      return `timer-page-container active-${timerMode}`;
    }
    if (isPaused) {
      return 'timer-page-container paused';
    }
    return 'timer-page-container';
  };

  return (
    <>
      <div className={getTimerPageClassName()}>
        <Header onOpenSettings={onOpenSettings} title="Timer" />
        <div className="timer-page-content">
          <TimerModeToggle
            mode={timerMode}
            onModeChange={onTimerModeChange}
            disabled={isActive || isPaused}
          />
          <TimerDisplay elapsedTime={elapsedTime} />
          <TimerControls
            isActive={isActive}
            isPaused={isPaused}
            onStart={() => startTimer(timerMode)}
            onPause={pauseTimer}
            onStop={stopTimer}
          />
          <div className="timer-page-actions">
            <button
              onClick={() => setIsQuickAddModalOpen(true)}
              className="button-secondary"
              disabled={isActive || isPaused}
            >
              Quick Add Session
            </button>
          </div>
        </div>
      </div>

      <SessionNotesModal
        isOpen={!!pendingSession}
        tasks={tasks}
        onSubmit={saveSession}
        onClose={discardPendingSession}
        sessionType={pendingSession?.type}
      />

      <QuickAddSessionModal
        isOpen={isQuickAddModalOpen}
        onClose={() => setIsQuickAddModalOpen(false)}
        tasks={tasks}
        onSubmit={addManualSession}
      />
    </>
  );
}