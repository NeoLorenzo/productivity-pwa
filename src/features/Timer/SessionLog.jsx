// src/features/Timer/SessionLog.jsx

import React from 'react';
import {
  formatDate,
  formatTime,
  formatDuration,
} from '../../utils/formatters';

/**
 * @description Displays a log of past timer sessions with selection capabilities.
 * @param {{
 *   sessions: Array<object>,
 *   dateFormat: string,
 *   timeFormat: string,
 *   selectedSessions: Set<string>,
 *   onSessionSelect: (sessionId: string) => void,
 *   onSelectAll: () => void
 * }} props
 * @returns {JSX.Element}
 */
export default function SessionLog({
  sessions,
  dateFormat,
  timeFormat,
  selectedSessions,
  onSessionSelect,
  onSelectAll,
}) {
  if (sessions.length === 0) {
    return <p>No sessions logged yet.</p>;
  }

  const isAllSelected = sessions.length > 0 && selectedSessions.size === sessions.length;

  return (
    <div className="session-log">
      <h3>Session History</h3>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
                aria-label="Select all sessions"
              />
            </th>
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
            const isUntimed = session.duration === 0;
            const isSelected = selectedSessions.has(session.id);

            return (
              <tr key={session.id} className={isSelected ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSessionSelect(session.id)}
                    aria-label={`Select session from ${formatDate(session.endTime, dateFormat)}`}
                  />
                </td>
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