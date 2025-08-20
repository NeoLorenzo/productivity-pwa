// src/hooks/useTimer.js

import { useState, useEffect, useRef } from 'react';
import { LOCAL_STORAGE_KEYS } from '../constants';

/**
 * @description A custom hook to manage a timer and log work sessions, including breaks.
 *
 * @returns {{
 *   elapsedTime: number,
 *   isActive: boolean,
 *   isPaused: boolean,
 *   sessions: Array<object>,
 *   startTimer: () => void,
 *   pauseTimer: () => void,
 *   stopTimer: () => void
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
    // This function now handles both starting and resuming.
    if (isPaused) {
      // Resuming from a pause.
      const breakDuration = Date.now() - breakStartTimeRef.current;
      startTimeRef.current += breakDuration; // Push start time forward by break duration.

      setCurrentBreaks([
        ...currentBreaks,
        { startTime: breakStartTimeRef.current, endTime: Date.now() },
      ]);
    } else {
      // Starting fresh.
      startTimeRef.current = Date.now();
      setCurrentBreaks([]); // Clear any previous breaks.
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

    // FIX: Check if the timer was stopped while it was paused.
    // If so, the final pause period needs to be manually captured and added as a break.
    if (isPaused) {
      finalBreaks.push({
        startTime: breakStartTimeRef.current,
        endTime: endTime,
      });
    }

    setIsActive(false);
    setIsPaused(false);

    // We check the elapsed time *after* handling the final break logic.
    if (Math.floor(elapsedTime) < 1) {
      setElapsedTime(0);
      setCurrentBreaks([]);
      return; // Don't log sessions with less than 1 second of work.
    }

    const newSession = {
      startTime: startTimeRef.current,
      endTime: endTime,
      duration: Math.floor(elapsedTime), // This is correct, as elapsedTime freezes on pause.
      breaks: finalBreaks, // Use the corrected breaks array.
    };

    setSessions((prevSessions) => [newSession, ...prevSessions]);
    setElapsedTime(0);
    setCurrentBreaks([]);
  };

  return { elapsedTime, isActive, isPaused, sessions, startTimer, pauseTimer, stopTimer };
}