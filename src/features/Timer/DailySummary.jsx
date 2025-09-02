// src/features/Timer/DailySummary.jsx

import React from 'react';
import { formatDate, formatDuration } from '../../utils/formatters';

/**
 * @description Displays a summary of total work time, session counts, and score per day.
 * @param {{
 *   dailySummary: Array<object>,
 *   dateFormat: string,
 *   isMobile: boolean,
 *   onDayClick: (day: object) => void
 * }} props
 * @returns {JSX.Element}
 */
export default function DailySummary({ dailySummary, dateFormat, isMobile, onDayClick }) {
  if (dailySummary.length === 0) {
    return null; // Don't render anything if there's no data
  }

  return (
    <div className="daily-summary">
      <h3>Daily Summary</h3>
      {isMobile ? (
        <div className="daily-summary-mobile-list">
          {dailySummary.map((day) => (
            <div
              key={day.date}
              className="daily-summary-mobile-item"
              onClick={() => onDayClick(day)}
            >
              <div className="mobile-item-main">
                <span className="mobile-item-date">{formatDate(day.date, dateFormat)}</span>
                <span className="mobile-item-duration">
                  Prod: {formatDuration(day.totalDuration)}
                </span>
                <span className="mobile-item-duration play">
                  Play: {formatDuration(day.totalPlayDuration)}
                </span>
              </div>
              <div className="mobile-item-meta">
                <span>Harmony: {day.dailyHarmonyScore.toFixed(2)}</span>
                <span>{day.totalScore} task points</span>
              </div>
              <div className="mobile-item-chevron">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="session-log">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Prod. Duration</th>
                <th>Play Duration</th>
                <th>Task Score</th>
                <th>Harmony Score</th>
              </tr>
            </thead>
            <tbody>
              {dailySummary.map((day) => (
                <tr key={day.date}>
                  <td data-label="Date">{formatDate(day.date, dateFormat)}</td>
                  <td data-label="Prod. Duration">{formatDuration(day.totalDuration)}</td>
                  <td data-label="Play Duration">{formatDuration(day.totalPlayDuration)}</td>
                  <td data-label="Task Score">{day.totalScore}</td>
                  <td data-label="Harmony Score">{day.dailyHarmonyScore.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}