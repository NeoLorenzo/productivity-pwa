import { useState, useEffect, useRef } from 'react';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { parseCSV } from '../utils/csvParser'; // Import the new parser utility

/**
 * @description A custom hook to manage a timer and log work sessions, including breaks and notes.
 *
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
 *   importSessions: (csvText: string) => void
 * }}
 */
export function useTimer() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentBreaks, setCurrentBreaks] = useState([]);
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem(LOCAL_STORAGE_KEYS.SESSIONS);
    return savedSessions ? JSON.parse(savedSessions) : [];
  });

  const [pendingSession, setPendingSession] = useState(null);

  const startTimeRef = useRef(null);
  const breakStartTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

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
      notes: '', // Initialize notes property
    };

    setPendingSession(sessionData);
    setElapsedTime(0);
    setCurrentBreaks([]);
  };

  const saveSessionWithNotes = (notes) => {
    if (!pendingSession) return;

    const newSession = {
      ...pendingSession,
      notes: notes.trim(),
    };

    setSessions((prevSessions) => [newSession, ...prevSessions]);
    setPendingSession(null);
  };

  const discardPendingSession = () => {
    setPendingSession(null);
  };

  /**
   * @description Parses a CSV string, merges the result with existing sessions, and sorts them.
   * @param {string} csvText - The raw text from the uploaded CSV file.
   */
  const importSessions = (csvText) => {
    try {
      const imported = parseCSV(csvText);
      if (imported.length === 0) {
        alert('No valid sessions found in the file.');
        return;
      }

      setSessions((prevSessions) => {
        // Combine and sort all sessions to ensure the log remains in chronological order.
        const combined = [...prevSessions, ...imported];
        // Sort by end time, descending (newest first)
        return combined.sort((a, b) => b.endTime - a.endTime);
      });

      alert(`${imported.length} session(s) imported successfully!`);
    } catch (error) {
      // Catch errors from the parser (e.g., bad headers) and show them to the user.
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
    importSessions, // Expose the new function
  };
}