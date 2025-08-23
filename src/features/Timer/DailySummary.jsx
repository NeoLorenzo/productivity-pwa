// src/features/Timer/DailySummary.jsx

import React from 'react';
import { formatDate, formatDuration } from '../../utils/formatters';

/**
 * @description Displays a summary of total work time and session counts per day.
 * @param {{
 *   dailySummary: Array<{date: number, totalDuration: number, sessionCount: number}>,
 *   dateFormat: string
 * }} props
 * @returns {JSX.Element}
 */
export default function DailySummary({ dailySummary, dateFormat }) {
  if (dailySummary.length === 0) {
    return null; // Don't render anything if there's no data
  }

  return (
    <div className="daily-summary session-log">
      <h3>Daily Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Sessions</th>
            <th>Total Work Duration</th>
          </tr>
        </thead>
        <tbody>
          {dailySummary.map((day) => (
            <tr key={day.date}>
              <td>{formatDate(day.date, dateFormat)}</td>
              <td>{day.sessionCount}</td>
              <td>{formatDuration(day.totalDuration)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}