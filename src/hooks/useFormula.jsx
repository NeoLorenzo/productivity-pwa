// src/hooks/useFormula.jsx

import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const defaultFormula = {
  timeDivisor: 20,
};

/**
 * @description A custom hook to manage the user's productivity points formula.
 * @param {string | null} userId - The ID of the currently authenticated user.
 * @returns {{
 *   formula: { timeDivisor: number },
 *   updateFormula: (newFormula: object) => Promise<void>
 * }}
 */
export function useFormula(userId) {
  const [formula, setFormula] = useState(defaultFormula);

  useEffect(() => {
    if (!userId) {
      setFormula(defaultFormula);
      return;
    }

    const userDocRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().formula) {
        setFormula(docSnap.data().formula);
      } else {
        // If no formula is set for the user, initialize it with the default.
        setDoc(userDocRef, { formula: defaultFormula }, { merge: true });
        setFormula(defaultFormula);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const updateFormula = async (newFormula) => {
    if (!userId) return;
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { formula: newFormula }, { merge: true });
  };

  return { formula, updateFormula };
}