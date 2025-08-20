// src/hooks/useScore.js

import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../constants';

/**
 * @description A custom hook to manage the user's score.
 * It handles state, persistence to localStorage, and provides a method to update the score.
 *
 * @returns {{
 *   score: number,
 *   addPoints: (amount: number) => void
 * }} An object containing the current score and a function to add points.
 */
export function useScore() {
  // Note: We use a function inside useState to ensure localStorage is only read once on initial render.
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem(LOCAL_STORAGE_KEYS.SCORE);
    // If a score is found in localStorage, parse it. Otherwise, start at 0.
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  // This effect runs whenever the 'score' state changes.
  // It saves the new score to localStorage, ensuring it persists across sessions.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SCORE, score);
  }, [score]);

  /**
   * @description Adds a specified number of points to the current score.
   * @param {number} amount - The number of points to add.
   */
  const addPoints = (amount) => {
    if (typeof amount !== 'number' || amount <= 0) return; // Basic validation
    setScore((prevScore) => prevScore + amount);
  };

  return { score, addPoints };
}