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

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      auth.signOut();
    }
  };

  return (
    <div className="auth-container">
      {auth.currentUser ? (
        <button onClick={handleSignOut} className="button-secondary">
          Sign Out
        </button>
      ) : (
        <button onClick={handleSignIn}>
          Sign in with Google
        </button>
      )}
    </div>
  );
}