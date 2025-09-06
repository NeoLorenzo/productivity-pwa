// src/hooks/useIntegrations.jsx

import { useState, useEffect } from 'react';
import { linkWithPopup, unlink, GithubAuthProvider } from 'firebase/auth';
import { doc, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db, auth, githubProvider } from '../firebase';

const defaultIntegrations = {
  github: {
    linked: false,
    username: null,
  },
};

/**
 * @description A hook to manage third-party service integrations for a user.
 * @param {string|null} userId The current user's ID.
 * @returns {{
 *   integrations: object,
 *   linkGitHub: () => Promise<void>,
 *   unlinkGitHub: () => Promise<void>
 * }}
 */
export function useIntegrations(userId) {
  const [integrations, setIntegrations] = useState(defaultIntegrations);

  useEffect(() => {
    if (!userId) {
      setIntegrations(defaultIntegrations);
      return;
    }

    // Gemini Note: Tokens and sensitive data are stored in a 'private' sub-collection
    // which can be secured with stricter Firestore rules.
    const privateDataRef = doc(db, 'users', userId, 'private', 'github');
    const unsubscribe = onSnapshot(privateDataRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setIntegrations((prev) => ({
          ...prev,
          github: { linked: true, username: data.username },
        }));
      } else {
        setIntegrations((prev) => ({ ...prev, github: { linked: false, username: null } }));
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const linkGitHub = async () => {
    if (!auth.currentUser) {
      alert('You must be logged in to link an account.');
      return;
    }

    try {
      const result = await linkWithPopup(auth.currentUser, githubProvider);

      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // Gemini Note: This is the definitive fix based on the console log.
      // The correct username is located at `_tokenResponse.screenName`.
      const githubUsername = result._tokenResponse?.screenName;

      if (token && githubUsername) {
        const privateDataRef = doc(db, 'users', auth.currentUser.uid, 'private', 'github');
        await setDoc(privateDataRef, {
          accessToken: token,
          username: githubUsername,
          uid: result.user.uid,
        });
        alert('GitHub account linked successfully!');
      } else {
        // If we still can't find a username, we must inform the user.
        console.error("Could not determine GitHub username from auth result.", result);
        alert("Failed to link GitHub account: could not determine username.");
      }
    } catch (error) {
      console.error('Error linking GitHub account:', error);
      alert(`Failed to link GitHub account. ${error.message}`);
    }
  };

  const unlinkGitHub = async () => {
    if (!auth.currentUser) return;

    try {
      await unlink(auth.currentUser, 'github.com');
      const privateDataRef = doc(db, 'users', auth.currentUser.uid, 'private', 'github');
      await deleteDoc(privateDataRef);
      alert('GitHub account unlinked successfully.');
    } catch (error) {
      console.error('Error unlinking GitHub account:', error);
      alert(`Failed to unlink GitHub account. ${error.message}`);
    }
  };

  return { integrations, linkGitHub, unlinkGitHub };
}