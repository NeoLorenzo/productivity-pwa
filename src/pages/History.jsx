import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import DailySummary from '../features/Timer/DailySummary';
import SessionLog from '../features/Timer/SessionLog';

/**
 * @description A page dedicated to displaying session history and summaries.
 */
export default function History({ sessions, dailySummary, dateFormat, timeFormat }) {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}>
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
      </main>
    </div>
  );
}