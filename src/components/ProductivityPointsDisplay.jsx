// src/components/ProductivityPointsDisplay.jsx

import React from 'react';

/**
 * @description A stateless component to display the user's total Productivity Points.
 * @param {{ points: number }} props - The component props.
 * @returns {JSX.Element}
 */
export default function ProductivityPointsDisplay({ points }) {
  return (
    <div className="score-display">
      <h2>Total Productivity Points</h2>
      <p>{points.toFixed(2)}</p>
    </div>
  );
}