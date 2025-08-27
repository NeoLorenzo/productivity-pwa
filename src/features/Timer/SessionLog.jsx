// src/features/Timer/SessionLog.jsx

import React from 'react';
import {
  formatDate,
  formatTime,
  formatDuration,
  calculateTotalBreakDuration,
} from '../../utils/formatters';

/**
 * @description Displays a log of past timer sessions, including tasks, scores, and notes.
 * @param {{ sessions: Array<object> }} props
 * @returns {JSX.Element}
 */
export default function SessionLog({ sessions, dateFormat, timeFormat }) {
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
            <th>Completed Tasks</th>
            <th>Session Score</th>
            <th>Notes</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => {
            const totalBreakSeconds = calculateTotalBreakDuration(session.breaks);
            return (
              <tr key={session.endTime}>
                <td>{formatDate(session.endTime, dateFormat)}</td>
                <td>{formatTime(session.startTime, timeFormat)}</td>
                <td>{formatTime(session.endTime, timeFormat)}</td>
                <td>{formatDuration(session.duration)}</td>
                <td>
                  {session.completedTasks?.length > 0
                    ? session.completedTasks.map(task => task.name).join(', ')
                    : '—'}
                </td>
                <td>{session.sessionScore > 0 ? session.sessionScore : '—'}</td>
                <td>{session.notes || '—'}</td>
                <td>
                  {session.location ? (
                    <a
                      href={`https://www.google.com/maps?q=${session.location.lat},${session.location.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Map
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}