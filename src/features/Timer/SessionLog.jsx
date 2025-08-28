// src/features/Timer/SessionLog.jsx

import React from 'react';
import {
  formatDate,
  formatTime,
  formatDuration,
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
            // Gemini Note: If a session's duration is 0, it was manually added
            // without a start/end time. We should display '—' instead of default times.
            const isUntimed = session.duration === 0;

            return (
              <tr key={session.endTime}>
                <td data-label="Date">{formatDate(session.endTime, dateFormat)}</td>
                <td data-label="Start Time">{isUntimed ? '—' : formatTime(session.startTime, timeFormat)}</td>
                <td data-label="End Time">{isUntimed ? '—' : formatTime(session.endTime, timeFormat)}</td>
                <td data-label="Work Duration">{isUntimed ? '—' : formatDuration(session.duration)}</td>
                <td data-label="Completed Tasks">
                  {session.completedTasks?.length > 0
                    ? session.completedTasks.map(task => task.name).join(', ')
                    : '—'}
                </td>
                <td data-label="Session Score">{session.sessionScore > 0 ? session.sessionScore : '—'}</td>
                <td data-label="Notes">{session.notes || '—'}</td>
                <td data-label="Location">
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