// src/features/Timer/SessionLog.jsx

import React from 'react';
import {
  formatDate,
  formatTime,
  formatDuration,
} from '../../utils/formatters';

/**
 * @description Displays a log of past timer sessions with selection and editing capabilities.
 * @param {{
 *   sessions: Array<object>,
 *   dateFormat: string,
 *   timeFormat: string,
 *   selectedSessions: Set<string>,
 *   onSessionSelect: (sessionId: string) => void,
 *   onSelectAll: () => void,
 *   onEditSession: (session: object) => void
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
  onEditSession,
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
            <th>Type</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration</th>
            <th>Completed Tasks</th>
            <th>Session Score</th>
            <th>Notes</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => {
            const isUntimed = session.duration === 0;
            const isSelected = selectedSessions.has(session.id);
            // For backward compatibility, default to 'productivity'
            const sessionType = session.type || 'productivity';

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
                <td data-label="Type">
                  <span className={`session-type-tag ${sessionType}`}>
                    {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)}
                  </span>
                </td>
                <td data-label="Date">{formatDate(session.endTime, dateFormat)}</td>
                <td data-label="Start Time">{isUntimed ? '—' : formatTime(session.startTime, timeFormat)}</td>
                <td data-label="End Time">{isUntimed ? '—' : formatTime(session.endTime, timeFormat)}</td>
                <td data-label="Duration">{isUntimed ? '—' : formatDuration(session.duration)}</td>
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
                <td data-label="Actions">
                  <button
                    onClick={() => onEditSession(session)}
                    className="icon-button"
                    aria-label="Edit Session"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}