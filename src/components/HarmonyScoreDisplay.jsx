// src/components/HarmonyScoreDisplay.jsx

import React from 'react';

/**
 * @description A component to display the user's Harmony Score with contextual feedback.
 * @param {{
 *   harmonyScore: number,
 *   productivityPoints: number,
 *   playPoints: number
 * }} props
 * @returns {JSX.Element}
 */
export default function HarmonyScoreDisplay({ harmonyScore, productivityPoints, playPoints }) {
  
  // Gemini Note: This function provides dynamic feedback based on the harmony score.
  const getHarmonyFeedback = () => {
    const score = harmonyScore;
    let feedback = {
      className: 'status-balanced',
      message: "You're in perfect balance. Keep it up!",
      arrowPosition: 50, // Center position for balanced
    };

    // Define a scale for arrow positioning. Let's cap the visual at +/- 10.
    const maxVisualScore = 10;
    const minVisualScore = -10;
    const clampedScore = Math.max(minVisualScore, Math.min(maxVisualScore, score));
    
    // Map the score from [-10, 10] to [0, 100] for the arrow position.
    feedback.arrowPosition = ((clampedScore - minVisualScore) / (maxVisualScore - minVisualScore)) * 100;

    if (score > 5) {
      feedback.className = 'status-productive';
      feedback.message = 'Time to play! Your focus has been outstanding. Enjoy some leisure.';
    } else if (score > 1) {
      feedback.className = 'status-productive-light';
      feedback.message = 'Great focus! Consider a break or some play time soon to stay balanced.';
    } else if (score < -5) {
      feedback.className = 'status-play';
      feedback.message = "Time to focus! You've recharged well. Let's get back to your goals.";
    } else if (score < -1) {
      feedback.className = 'status-play-light';
      feedback.message = 'Enjoying your break! A short focus session will bring you back to balance.';
    }
    
    return feedback;
  };

  const feedback = getHarmonyFeedback();

  return (
    <div className="harmony-score-display">
      <div className="harmony-score-main">
        <span className={`harmony-score-value ${feedback.className}`}>{harmonyScore.toFixed(2)}</span>
        <span className="harmony-score-label">Harmony Score</span>
      </div>

      <div className="harmony-feedback-visual">
        <div className="harmony-scale">
          <div className="scale-section play">Play</div>
          <div className="scale-section balanced">Balanced</div>
          <div className="scale-section productive">Productivity</div>
        </div>
        <div className="scale-arrow-container" style={{ left: `${feedback.arrowPosition}%` }}>
          <div className={`scale-arrow ${feedback.className}`}></div>
        </div>
      </div>

      <p className={`harmony-feedback-text ${feedback.className}`}>
        {feedback.message}
      </p>

      <div className="harmony-score-breakdown">
        <div className="breakdown-item">
          <span className="breakdown-value">{productivityPoints.toFixed(2)}</span>
          <span className="breakdown-label">Productivity Points</span>
        </div>
        <div className="breakdown-item">
          <span className="breakdown-value">{playPoints.toFixed(2)}</span>
          <span className="breakdown-label">Play Points</span>
        </div>
      </div>
    </div>
  );
}