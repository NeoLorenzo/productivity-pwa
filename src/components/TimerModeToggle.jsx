// src/components/TimerModeToggle.jsx

import React from 'react';

/**
 * @description A UI component for switching between 'Productivity' and 'Play' timer modes.
 * @param {{
 *   mode: 'productivity' | 'play',
 *   onModeChange: (newMode: 'productivity' | 'play') => void,
 *   disabled: boolean
 * }} props
 * @returns {JSX.Element}
 */
export default function TimerModeToggle({ mode, onModeChange, disabled }) {
  return (
    <div className="timer-mode-toggle">
      <button
        className={mode === 'productivity' ? 'active' : ''}
        onClick={() => onModeChange('productivity')}
        disabled={disabled}
      >
        Productivity
      </button>
      <button
        className={mode === 'play' ? 'active' : ''}
        onClick={() => onModeChange('play')}
        disabled={disabled}
      >
        Play
      </button>
    </div>
  );
}