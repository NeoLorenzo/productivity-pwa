// src/features/Timer/TimerDisplay.jsx

import React from 'react';
import { formatDuration } from '../../utils/formatters';

/**
 * @description Displays the formatted elapsed time.
 * @param {{ elapsedTime: number }} props
 * @returns {JSX.Element}
 */
export default function TimerDisplay({ elapsedTime }) {
  return <div className="timer-display">{formatDuration(elapsedTime)}</div>;
}