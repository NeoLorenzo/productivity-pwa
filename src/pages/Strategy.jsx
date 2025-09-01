// src/pages/Strategy.jsx

import React from 'react';
import Header from '../components/Header';
import TaskManager from '../features/Tasks';

/**
 * @description A page for managing user-defined tasks and their scores.
 */
export default function Strategy({ onOpenSettings }) {
  return (
    <div className="app-container">
      <Header onOpenSettings={onOpenSettings} title="Strategy" />
      {/* Gemini Note: Replaced the custom <main> with the standard .app-layout div
          to ensure consistent padding and responsive behavior across the app. */}
      <div className="app-layout" style={{ maxWidth: '800px' }}>
        <TaskManager />
      </div>
    </div>
  );
}