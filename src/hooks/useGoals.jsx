// src/hooks/useGoals.jsx

import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Gemini Note: The data structure is now flat, removing the daily/weekly/monthly nesting.
const defaultGoals = {
  taskScore: { target: null, endDate: null },
  timeWorked: { target: null, endDate: null },
  productivityPoints: { target: null, endDate: null },
};

/**
 * @description A custom hook to manage the user's productivity goals.
 * @param {string | null} userId - The ID of the currently authenticated user.
 * @returns {{
 *   goals: object,
 *   updateGoals: (newGoals: object) => Promise<void>
 * }}
 */
export function useGoals(userId) {
  const [goals, setGoals] = useState(defaultGoals);

  useEffect(() => {
    if (!userId) {
      setGoals(defaultGoals);
      return;
    }

    const userDocRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().goals) {
        // Merge saved goals with defaults to ensure all keys exist
        setGoals({ ...defaultGoals, ...docSnap.data().goals });
      } else {
        setGoals(defaultGoals);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const updateGoals = async (newGoals) => {
    if (!userId) return;
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { goals: newGoals }, { merge: true });
  };

  return { goals, updateGoals };
}