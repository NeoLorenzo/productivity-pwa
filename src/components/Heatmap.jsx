// src/components/Heatmap.jsx

import React from 'react';
import { formatHeatmapTooltip } from '../utils/heatmapUtils';

/**
 * @description Renders a GitHub-style heatmap for daily activity.
 * @param {{
 *   title: string,
 *   data: {
 *     monthLabels: Array<{label: string, colStart: number}>,
 *     days: Array<{date: string, value: number, level: number}>
 *   },
 *   valueKey: 'totalDuration' | 'totalScore'
 * }} props
 * @returns {JSX.Element}
 */
export default function Heatmap({ title, data, valueKey, onClick }) {
  const { monthLabels, days } = data;

  return (
    <div className="heatmap-container" onClick={onClick}>
      <h4>{title}</h4>
      <div className="heatmap-body">
        <div className="heatmap-day-labels">
          {/* Gemini Note: Using empty spans as spacers to correctly align labels with grid rows. */}
          <span>Mon</span>
          <span />
          <span>Wed</span>
          <span />
          <span>Fri</span>
          <span />
          <span />
        </div>
        <div className="heatmap-grid-wrapper">
          <div className="heatmap-months">
            {monthLabels.map((month) => (
              <div
                key={month.label + month.colStart}
                className="heatmap-month-label"
                style={{ gridColumnStart: month.colStart }}
              >
                {month.label}
              </div>
            ))}
          </div>
          <div className="heatmap-grid">
            {Array.from({ length: Math.ceil(days.length / 7) }).map((_, colIndex) => (
              <div className="heatmap-column" key={colIndex}>
                {days.slice(colIndex * 7, colIndex * 7 + 7).map((day) => {
                  if (day.level === -1) {
                    return <div key={day.date} className="heatmap-cell placeholder" />;
                  }
                  // Gemini Note: Added a new condition to render future days with a unique class.
                  if (day.level === -2) {
                    return <div key={day.date} className="heatmap-cell future" />;
                  }
                  return (
                    <div
                      key={day.date}
                      className="heatmap-cell"
                      data-level={day.level}
                    >
                      <span className="heatmap-tooltip">
                        {formatHeatmapTooltip(day, valueKey)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}