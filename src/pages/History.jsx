// src/pages/History.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import DailySummary from '../features/Timer/DailySummary';
import SessionLog from '../features/Timer/SessionLog';

/**
 * @description A page dedicated to displaying session history and summaries.
 */
export default function History({ sessions, dailySummary, dateFormat, timeFormat, onOpenSettings }) {
  return (
    <div className="app-container">
      <Header onOpenSettings={onOpenSettings} title="History" />
      {/* Gemini Note: Replaced the custom <main> with the standard .app-layout div
          to ensure consistent padding and responsive behavior across the app.
          A max-width is applied to keep the content centered on large screens. */}
      <div className="app-layout" style={{ maxWidth: '1000px' }}>
        <Card title="Session History">
          <div className="history-page-controls">
            <Link to="/" className="button-secondary">
              ← Back to Timer
            </Link>
          </div>
          <DailySummary dailySummary={dailySummary} dateFormat={dateFormat} />
          <SessionLog
            sessions={sessions}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
          />
        </Card>
      </div>
    </div>
  );
}