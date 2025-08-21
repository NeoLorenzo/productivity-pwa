import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../constants';

/**
 * @description A custom hook to manage the user's score.
 * @returns {{
 *   score: number,
 *   addPoints: (amount: number) => void,
 *   clearScore: () => void
 * }}
 */
export function useScore() {
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem(LOCAL_STORAGE_KEYS.SCORE);
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SCORE, score);
  }, [score]);

  const addPoints = (amount) => {
    if (typeof amount !== 'number' || amount <= 0) return;
    setScore((prevScore) => prevScore + amount);
  };

  /**
   * @description Resets the score to 0.
   */
  const clearScore = () => {
    setScore(0);
  };

  return { score, addPoints, clearScore }; // Expose the new function
}