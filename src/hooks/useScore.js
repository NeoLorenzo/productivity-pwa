// src/hooks/useScore.jsx

import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * @description A custom hook to manage the user's score from Firestore.
 * @param {string | null} userId - The ID of the currently authenticated user.
 * @returns {{ score: number, addPoints: (amount: number) => void, clearScore: () => void }}
 */
export function useScore(userId) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!userId) {
      setScore(0);
      return;
    }

    const userDocRef = doc(db, 'users', userId);

    // Gemini Note: onSnapshot provides real-time updates.
    // When the score changes in the database, the UI will update automatically.
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setScore(docSnap.data().score || 0);
      } else {
        // If the user document doesn't exist, we don't need to do anything.
        // It will be created when points are first added.
        setScore(0);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const addPoints = async (amount) => {
    if (!userId || typeof amount !== 'number' || amount <= 0) return;
    const userDocRef = doc(db, 'users', userId);
    // Gemini Note: Using `increment` is an atomic operation, which prevents race conditions.
    // `setDoc` with `merge: true` ensures we don't overwrite the whole document.
    await updateDoc(userDocRef, { score: increment(amount) }).catch(async (err) => {
        // If the document doesn't exist, set it.
        if (err.code === 'not-found') {
            const { setDoc } = await import('firebase/firestore');
            await setDoc(userDocRef, { score: amount }, { merge: true });
        }
    });
  };

  const clearScore = async () => {
    if (!userId) return;
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { score: 0 });
  };

  return { score, addPoints, clearScore };
}