// src/hooks/useTimerMode.jsx

import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const DEFAULT_MODE = 'productivity';

/**
 * @description A custom hook to manage and synchronize the timer mode across devices.
 * @param {string | null} userId - The ID of the currently authenticated user.
 * @returns {{
 *   timerMode: 'productivity' | 'play',
 *   updateTimerMode: (newMode: 'productivity' | 'play') => Promise<void>
 * }}
 */
export function useTimerMode(userId) {
  const [timerMode, setTimerMode] = useState(DEFAULT_MODE);

  useEffect(() => {
    if (!userId) {
      setTimerMode(DEFAULT_MODE);
      return;
    }

    const userDocRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().timerMode) {
        setTimerMode(docSnap.data().timerMode);
      } else {
        // If no mode is set, default to productivity.
        setTimerMode(DEFAULT_MODE);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const updateTimerMode = async (newMode) => {
    if (!userId || (newMode !== 'productivity' && newMode !== 'play')) return;
    const userDocRef = doc(db, 'users', userId);
    // Gemini Note: Using setDoc with merge ensures we only update or create this one field.
    await setDoc(userDocRef, { timerMode: newMode }, { merge: true });
  };

  return { timerMode, updateTimerMode };
}