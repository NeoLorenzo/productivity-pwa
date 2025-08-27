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
      <Header onOpenSettings={onOpenSettings} />
      <main className="main-content" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>
        <Card title="Manage Your Tasks">
          <div className="history-page-controls">
            <Link to="/" className="button-secondary">
              ← Back to Home
            </Link>
          </div>
          <TaskManager />
        </Card>
      </main>
    </div>
  );
}