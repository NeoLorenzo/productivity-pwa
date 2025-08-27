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
  updateDoc,
  setDoc,
  deleteField,
} from 'firebase/firestore';
import { db } from '../firebase';
import { parseCSV } from '../utils/csvParser';

/**
 * @description A custom hook to manage a timer and log work sessions, including breaks and notes.
 * @param {string | null} userId - The ID of the currently authenticated user.
 * @param {{ addPoints: (amount: number) => void }} scoreManager - The addPoints function from useScore.
 * @returns {{
 *   elapsedTime: number,
 *   isActive: boolean,
 *   isPaused: boolean,
 *   sessions: Array<object>,
 *   pendingSession: object | null,
 *   startTimer: () => void,
 *   pauseTimer: () => void,
 *   stopTimer: () => void,
 *   saveSession: (sessionData: object) => void,
 *   discardPendingSession: () => void,
 *   importSessions: (csvText: string) => void,
 *   clearSessions: () => void
 * }}
 */
export function useTimer(userId, { addPoints }) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [pendingSession, setPendingSession] = useState(null);

  const timerStateRef = useRef(null);
  const intervalRef = useRef(null);

  // Gemini Note: This effect syncs the timer's state with Firestore.
  // It listens to the user's document and updates the local state whenever the
  // 'timerState' field changes in the database. This allows the timer to persist
  // even if the user closes the app.
  useEffect(() => {
    if (!userId) {
      setIsActive(false);
      setIsPaused(false);
      setElapsedTime(0);
      timerStateRef.current = null;
      return;
    }

    const userDocRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      const timerState = docSnap.data()?.timerState;
      timerStateRef.current = timerState;

      if (timerState && timerState.startTime) {
        setIsActive(timerState.isActive);
        setIsPaused(timerState.isPaused);

        if (timerState.isPaused && timerState.pauseTime) {
          const totalBreakDuration = (timerState.breaks || []).reduce(
            (acc, br) => acc + (br.endTime - br.startTime),
            0
          );
          const mainDuration = timerState.pauseTime - timerState.startTime;
          setElapsedTime((mainDuration - totalBreakDuration) / 1000);
        }
      } else {
        setIsActive(false);
        setIsPaused(false);
        setElapsedTime(0);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // Gemini Note: This effect runs the local timer interval for the UI display.
  // It reads from a ref containing the Firestore state to calculate the correct
  // elapsed time every second, preventing stale state issues.
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        const timerState = timerStateRef.current;
        if (timerState && timerState.startTime) {
          const totalBreakDuration = (timerState.breaks || []).reduce(
            (acc, br) => acc + (br.endTime - br.startTime),
            0
          );
          const currentDuration = Date.now() - timerState.startTime;
          setElapsedTime(Math.max(0, (currentDuration - totalBreakDuration) / 1000));
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

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

  const startTimer = async () => {
    if (!userId) return;
    const userDocRef = doc(db, 'users', userId);
    const currentState = timerStateRef.current;

    if (currentState?.isPaused) {
      const updatedBreaks = [
        ...(currentState.breaks || []),
        { startTime: currentState.pauseTime, endTime: Date.now() },
      ];
      await updateDoc(userDocRef, {
        'timerState.isActive': true,
        'timerState.isPaused': false,
        'timerState.pauseTime': null,
        'timerState.breaks': updatedBreaks,
      });
    } else {
      const newTimerState = {
        timerState: {
          startTime: Date.now(),
          isActive: true,
          isPaused: false,
          breaks: [],
          pauseTime: null,
        },
      };
      await setDoc(userDocRef, newTimerState, { merge: true });
    }
  };

  const pauseTimer = async () => {
    if (!userId) return;
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      'timerState.isActive': false,
      'timerState.isPaused': true,
      'timerState.pauseTime': Date.now(),
    });
  };

  const stopTimer = async () => {
    if (!userId) return;
    const userDocRef = doc(db, 'users', userId);
    const finalState = timerStateRef.current;

    if (!finalState) return;

    const endTime = Date.now();
    let finalBreaks = finalState.breaks || [];

    if (finalState.isPaused) {
      finalBreaks = [
        ...finalBreaks,
        { startTime: finalState.pauseTime, endTime: endTime },
      ];
    }

    const totalBreakDurationMs = finalBreaks.reduce(
      (acc, br) => acc + (br.endTime - br.startTime),
      0
    );

    const totalDurationMs = endTime - finalState.startTime;
    const workDurationSeconds = Math.floor((totalDurationMs - totalBreakDurationMs) / 1000);

    await updateDoc(userDocRef, { timerState: deleteField() });

    if (workDurationSeconds < 1) {
      return;
    }

    const sessionData = {
      startTime: finalState.startTime,
      endTime: endTime,
      duration: workDurationSeconds,
      breaks: finalBreaks,
      notes: '',
      completedTasks: [],
      sessionScore: 0,
    };

    setPendingSession(sessionData);
  };

  const saveSession = async (sessionData) => {
    if (!pendingSession || !userId) return;

    const { notes, location, completedTasks } = sessionData;

    const sessionScore = completedTasks.reduce((total, task) => total + task.score, 0);

    const newSession = {
      ...pendingSession,
      notes: notes.trim(),
      location: location || null,
      completedTasks: completedTasks || [],
      sessionScore: sessionScore,
    };

    const sessionsColRef = collection(db, 'users', userId, 'sessions');
    await addDoc(sessionsColRef, newSession);

    if (sessionScore > 0) {
      addPoints(sessionScore);
    }

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
    saveSession,
    discardPendingSession,
    importSessions,
    clearSessions,
  };
}