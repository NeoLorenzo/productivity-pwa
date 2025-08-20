// src/components/ScoreDisplay.jsx

import React from 'react';

/**
 * @description A stateless component to display the user's score.
 * @param {{ score: number }} props - The component props.
 * @returns {JSX.Element}
 */
export default function ScoreDisplay({ score }) {
  return (
    <div className="score-display">
      <h2>Current Score</h2>
      <p>{score}</p>
    </div>
  );
}