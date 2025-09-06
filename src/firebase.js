// src/firebase.js

// Gemini Note: This file centralizes Firebase initialization.
// It's a single source of truth for connecting to Firebase services.

import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjZzQGIvEQxw1uy16RUODpJJdvU0u15yg",
  authDomain: "productivity-pwa-3780a.firebaseapp.com",
  projectId: "productivity-pwa-3780a",
  storageBucket: "productivity-pwa-3780a.firebasestorage.app",
  messagingSenderId: "614210719833",
  appId: "1:614210719833:web:55bfbecd21d1a41cf46148",
  measurementId: "G-5FKYTDPMB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the services we'll need
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();