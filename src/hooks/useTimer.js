// src/hooks/useTimer.jsx

import { useState, useEffect, useRef } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  writeBatch,
  getDocs,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { parseCSV } from '../utils/csvParser';

/**
 * @description A custom hook to manage a timer and log work sessions, including breaks and notes.
 * @param {string | null} userId - The ID of the currently authenticated user.
 * @returns {{
 *   elapsedTime: number,
 *   isActive: boolean,
 *   isPaused: boolean,
 *   sessions: Array<object>,
 *   pendingSession: object | null,
 *   startTimer: () => void,
 *   pauseTimer: () => void,
 *   stopTimer: () => void,
 *   saveSessionWithNotes: (notes: string) => void,
 *   discardPendingSession: () => void,
 *   importSessions: (csvText: string) => void,
 *   clearSessions: () => void
 * }}
 */
export function useTimer(userId) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentBreaks, setCurrentBreaks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [pendingSession, setPendingSession] = useState(null);

  const startTimeRef = useRef(null);
  const breakStartTimeRef = useRef(null);
  const intervalRef = useRef(null);

  // Gemini Note: This effect sets up a real-time listener to Firestore.
  // It fetches the user's sessions and updates the state whenever the data changes in the cloud.
  useEffect(() => {
    if (!userId) {
      setSessions([]);
      return;
    }

    const sessionsColRef = collection(db, 'users', userId, 'sessions');
    const q = query(sessionsColRef, orderBy('endTime', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userSessions = [];
      querySnapshot.forEach((doc) => {
        userSessions.push({ id: doc.id, ...doc.data() });
      });
      setSessions(userSessions);
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((Date.now() - startTimeRef.current) / 1000);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, startTimeRef]);

  const startTimer = () => {
    if (isPaused) {
      const breakDuration = Date.now() - breakStartTimeRef.current;
      startTimeRef.current += breakDuration;

      setCurrentBreaks([
        ...currentBreaks,
        { startTime: breakStartTimeRef.current, endTime: Date.now() },
      ]);
    } else {
      startTimeRef.current = Date.now();
      setCurrentBreaks([]);
    }

    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsActive(false);
    setIsPaused(true);
    breakStartTimeRef.current = Date.now();
  };

  const stopTimer = () => {
    const endTime = Date.now();
    let finalBreaks = [...currentBreaks];

    if (isPaused) {
      finalBreaks.push({
        startTime: breakStartTimeRef.current,
        endTime: endTime,
      });
    }

    setIsActive(false);
    setIsPaused(false);

    if (Math.floor(elapsedTime) < 1) {
      setElapsedTime(0);
      setCurrentBreaks([]);
      return;
    }

    const sessionData = {
      startTime: startTimeRef.current,
      endTime: endTime,
      duration: Math.floor(elapsedTime),
      breaks: finalBreaks,
      notes: '',
    };

    setPendingSession(sessionData);
    setElapsedTime(0);
    setCurrentBreaks([]);
  };

  const saveSessionWithNotes = async (notes) => {
    if (!pendingSession || !userId) return;

    const newSession = {
      ...pendingSession,
      notes: notes.trim(),
    };

    const sessionsColRef = collection(db, 'users', userId, 'sessions');
    await addDoc(sessionsColRef, newSession);

    setPendingSession(null);
  };

  const discardPendingSession = () => {
    setPendingSession(null);
  };

  const clearSessions = async () => {
    if (!userId) return;

    const sessionsColRef = collection(db, 'users', userId, 'sessions');
    const querySnapshot = await getDocs(sessionsColRef);

    if (querySnapshot.empty) return;

    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  };

  const importSessions = async (csvText) => {
    if (!userId) return;

    try {
      const imported = parseCSV(csvText);
      if (imported.length === 0) {
        alert('No valid sessions found in the file.');
        return;
      }

      const sessionsColRef = collection(db, 'users', userId, 'sessions');
      const batch = writeBatch(db);

      imported.forEach((session) => {
        const newDocRef = doc(sessionsColRef);
        batch.set(newDocRef, session);
      });

      await batch.commit();

      alert(`${imported.length} session(s) imported successfully!`);
    } catch (error) {
      alert(`Error importing sessions: ${error.message}`);
    }
  };

  return {
    elapsedTime,
    isActive,
    isPaused,
    sessions,
    pendingSession,
    startTimer,
    pauseTimer,
    stopTimer,
    saveSessionWithNotes,
    discardPendingSession,
    importSessions,
    clearSessions,
  };
}