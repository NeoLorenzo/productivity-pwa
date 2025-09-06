// src/hooks/useGithubSettings.jsx

import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const defaultSettings = {
  linesOfCodeScore: 0.1, // Default to 0.1 points per line of code
};

/**
 * @description A custom hook to manage the user's GitHub integration settings.
 * @param {string | null} userId - The ID of the currently authenticated user.
 * @returns {{
 *   githubSettings: { linesOfCodeScore: number },
 *   updateGithubSettings: (newSettings: object) => Promise<void>
 * }}
 */
export function useGithubSettings(userId) {
  const [githubSettings, setGithubSettings] = useState(defaultSettings);

  useEffect(() => {
    if (!userId) {
      setGithubSettings(defaultSettings);
      return;
    }

    const userDocRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().githubSettings) {
        setGithubSettings({ ...defaultSettings, ...docSnap.data().githubSettings });
      } else {
        // If no settings are set for the user, initialize with the default.
        setDoc(userDocRef, { githubSettings: defaultSettings }, { merge: true });
        setGithubSettings(defaultSettings);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const updateGithubSettings = async (newSettings) => {
    if (!userId) return;
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { githubSettings: newSettings }, { merge: true });
  };

  return { githubSettings, updateGithubSettings };
}