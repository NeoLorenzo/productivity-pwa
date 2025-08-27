// src/components/HeatmapModal.jsx

import React from 'react';
import { formatHeatmapTooltip } from '../utils/heatmapUtils';

/**
 * @description A modal to display a full-year, vertical heatmap.
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   title: string,
 *   data: object,
 *   valueKey: 'totalDuration' | 'totalScore'
 * }} props
 * @returns {JSX.Element | null}
 */
export default function HeatmapModal({ isOpen, onClose, title, data, valueKey }) {
  if (!isOpen) {
    return null;
  }

  const { days } = data;

  // Group days by month for vertical rendering
  const months = days.reduce((acc, day) => {
    if (day.level === -1) return acc; // Skip placeholders
    const monthName = new Date(day.date).toLocaleString('default', { month: 'long' });
    if (!acc[monthName]) {
      acc[monthName] = [];
    }
    acc[monthName].push(day);
    return acc;
  }, {});

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content heatmap-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title} - Full Year</h2>
        <div className="vertical-heatmap-container">
          {Object.entries(months).map(([monthName, monthDays]) => (
            <div key={monthName} className="vertical-heatmap-month">
              <h3>{monthName}</h3>
              <div className="vertical-heatmap-grid">
                {monthDays.map((day) => {
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
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="button-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}