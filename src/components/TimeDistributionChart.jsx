// src/components/TimeDistributionChart.jsx

import React, { useState, useEffect } from 'react';
import { formatDuration } from '../utils/formatters';

// Gemini Note: A dedicated component for the SVG chart segment for clarity.
const ChartSegment = ({ radius, strokeWidth, percentage, rotation, colorClass }) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <circle
      className={`chart-segment ${colorClass}`}
      cx={radius + strokeWidth}
      cy={radius + strokeWidth}
      r={radius}
      strokeWidth={strokeWidth}
      strokeDasharray={circumference}
      strokeDashoffset={strokeDashoffset}
      transform={`rotate(${rotation}, ${radius + strokeWidth}, ${radius + strokeWidth})`}
    />
  );
};

/**
 * @description A component to display time distribution as a donut chart.
 * @param {{
 *   avgProductivitySeconds: number,
 *   avgPlaySeconds: number
 * }} props
 * @returns {JSX.Element}
 */
export default function TimeDistributionChart({ avgProductivitySeconds, avgPlaySeconds }) {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Gemini Note: This effect triggers the animation on component mount.
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const totalSecondsInDay = 24 * 60 * 60;
  const avgRestSeconds = Math.max(0, totalSecondsInDay - avgProductivitySeconds - avgPlaySeconds);

  const productivityPercent = (avgProductivitySeconds / totalSecondsInDay) * 100;
  const playPercent = (avgPlaySeconds / totalSecondsInDay) * 100;
  const restPercent = 100 - productivityPercent - playPercent;

  const legendItems = [
    { id: 'prod', label: 'Productivity', value: formatDuration(avgProductivitySeconds), percent: productivityPercent, className: 'productivity' },
    { id: 'play', label: 'Play', value: formatDuration(avgPlaySeconds), percent: playPercent, className: 'play' },
    { id: 'rest', label: 'Rest', value: formatDuration(avgRestSeconds), percent: restPercent, className: 'rest' },
  ];

  const totalTrackedSeconds = avgProductivitySeconds + avgPlaySeconds;
  const defaultCenterText = { value: formatDuration(totalTrackedSeconds), label: 'Tracked' };
  const centerText = hoveredSegment || defaultCenterText;

  // Gemini Note: Increased strokeWidth for a thicker donut and adjusted radius.
  const radius = 75;
  const strokeWidth = 25;
  const viewBoxSize = (radius + strokeWidth) * 2;

  const playRotation = -90 + (productivityPercent * 3.6);

  return (
    <div className={`time-distribution-chart ${isMounted ? 'mounted' : ''}`}>
      <div className="donut-chart-container">
        <svg className="donut-chart-svg" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
          <circle className="chart-track" cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} strokeWidth={strokeWidth} />
          <ChartSegment radius={radius} strokeWidth={strokeWidth} percentage={productivityPercent} rotation={-90} colorClass="productivity" />
          <ChartSegment radius={radius} strokeWidth={strokeWidth} percentage={playPercent} rotation={playRotation} colorClass="play" />
        </svg>
        <div className="chart-center-text" key={centerText.label}>
          <span className="center-text-value">{centerText.value}</span>
          <span className="center-text-label">{centerText.label}</span>
        </div>
      </div>
      <div className="chart-legend">
        {legendItems.map(item => (
          <div
            key={item.id}
            className="legend-item"
            onMouseEnter={() => setHoveredSegment({ value: item.value, label: item.label })}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <span className={`legend-color-box ${item.className}`}></span>
            <span className="legend-label">{item.label}</span>
            <span className="legend-percent">{item.percent.toFixed(1)}%</span>
            <span className="legend-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}