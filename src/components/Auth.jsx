// src/components/Auth.jsx

import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

/**
 * @description A component that provides a "Sign in with Google" button.
 */
export default function Auth() {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  // Gemini Note: This component now only renders the sign-in button.
  // If a user is already logged in, it renders nothing.
  if (auth.currentUser) {
    return null;
  }

  return (
    <div className="auth-container">
      <button onClick={handleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
}