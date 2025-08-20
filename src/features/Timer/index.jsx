// src/features/Timer/index.jsx

import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import SessionLog from './SessionLog';

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
  } = useTimer();

  return (
    <div className="timer-feature">
      <h2>Focus Timer</h2>
      <TimerDisplay elapsedTime={elapsedTime} />
      <TimerControls
        isActive={isActive}
        isPaused={isPaused}
        onStart={startTimer} // onStart now handles both start and resume
        onPause={pauseTimer}
        onStop={stopTimer}
      />
      <SessionLog sessions={sessions} />
    </div>
  );
}