// src/hooks/useTasks.jsx

import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * @description A custom hook to manage a user's customizable tasks and their scores.
 * @param {string | null} userId - The ID of the currently authenticated user.
 * @returns {{
 *   tasks: Array<{id: string, name: string, score: number}>,
 *   addTask: (name: string, score: number) => Promise<void>,
 *   updateTask: (taskId: string, newName: string, newScore: number) => Promise<void>,
 *   deleteTask: (taskId: string) => Promise<void>
 * }}
 */
export function useTasks(userId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      return;
    }

    const tasksColRef = collection(db, 'users', userId, 'tasks');
    const q = query(tasksColRef, orderBy('name', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userTasks = [];
      querySnapshot.forEach((doc) => {
        userTasks.push({ id: doc.id, ...doc.data() });
      });
      setTasks(userTasks);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTask = async (name, score) => {
    if (!userId || !name || typeof score !== 'number' || score < 0) return;
    const tasksColRef = collection(db, 'users', userId, 'tasks');
    await addDoc(tasksColRef, { name: name.trim(), score });
  };

  const updateTask = async (taskId, newName, newScore) => {
    if (!userId || !taskId) return;
    const taskDocRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(taskDocRef, { name: newName.trim(), score: newScore });
  };

  const deleteTask = async (taskId) => {
    if (!userId || !taskId) return;
    const taskDocRef = doc(db, 'users', userId, 'tasks', taskId);
    await deleteDoc(taskDocRef);
  };

  return { tasks, addTask, updateTask, deleteTask };
}