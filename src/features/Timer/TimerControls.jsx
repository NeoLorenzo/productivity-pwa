// src/features/Timer/TimerControls.jsx

import React from 'react';

/**
 * @description Provides start, pause, resume, and stop buttons for the timer.
 * @param {{
 *   isActive: boolean,
 *   isPaused: boolean,
 *   onStart: () => void,
 *   onPause: () => void,
 *   onStop: () => void
 * }} props
 * @returns {JSX.Element}
 */
export default function TimerControls({ isActive, isPaused, onStart, onPause, onStop }) {
  const hasStarted = isActive || isPaused;

  return (
    <div className="timer-controls">
      {!hasStarted && (
        <button onClick={onStart} className="start-button">
          Start Timer
        </button>
      )}

      {isActive && !isPaused && (
        <button onClick={onPause} className="pause-button">
          Pause
        </button>
      )}

      {isPaused && (
        <button onClick={onStart} className="start-button">
          Resume
        </button>
      )}

      {hasStarted && (
        <button onClick={onStop} className="stop-button">
          Stop Timer
        </button>
      )}
    </div>
  );
}