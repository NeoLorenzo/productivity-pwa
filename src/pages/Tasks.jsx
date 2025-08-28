// src/pages/Tasks.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import TaskManager from '../features/Tasks';

/**
 * @description A page for managing user-defined tasks and their scores.
 */
export default function Tasks({ onOpenSettings }) {
  return (
    <div className="app-container">
      <Header onOpenSettings={onOpenSettings} title="Tasks" />
      {/* Gemini Note: Replaced the custom <main> with the standard .app-layout div
          to ensure consistent padding and responsive behavior across the app. */}
      <div className="app-layout" style={{ maxWidth: '800px' }}>
        <div className="history-page-controls">
          <Link to="/" className="button-secondary">
            ← Back to Home
          </Link>
        </div>
        <TaskManager />
      </div>
    </div>
  );
}