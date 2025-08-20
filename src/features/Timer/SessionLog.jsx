// src/features/Timer/SessionLog.jsx

import React from 'react';
import {
  formatDate,
  formatTime,
  formatDuration,
  calculateTotalBreakDuration, // Import the new utility
} from '../../utils/formatters';

/**
 * @description Displays a log of past timer sessions, including break data.
 * @param {{ sessions: Array<{startTime: number, endTime: number, duration: number, breaks: Array<object>}> }} props
 * @returns {JSX.Element}
 */
export default function SessionLog({ sessions }) {
  if (sessions.length === 0) {
    return <p>No sessions logged yet.</p>;
  }

  return (
    <div className="session-log">
      <h3>Session History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Work Duration</th>
            <th>Breaks</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => {
            const totalBreakSeconds = calculateTotalBreakDuration(session.breaks);
            return (
              <tr key={session.endTime}>
                <td>{formatDate(session.endTime)}</td>
                <td>{formatTime(session.startTime)}</td>
                <td>{formatTime(session.endTime)}</td>
                <td>{formatDuration(session.duration)}</td>
                <td>
                  {session.breaks?.length > 0
                    ? `${session.breaks.length} (${formatDuration(totalBreakSeconds)})`
                    : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}