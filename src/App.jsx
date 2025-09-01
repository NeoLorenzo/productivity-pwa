// src/App.jsx

import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useScore } from './hooks/useScore';
import { useTimer } from './hooks/useTimer';
import { useSettings } from './hooks/useSettings';
import { useTasks } from './hooks/useTasks';
import { useMediaQuery } from './hooks/useMediaQuery';
import { aggregateSessionsByDay } from './utils/sessionAggregators';
import { exportSessionsToCSV } from './utils/csvGenerator';

import Home from './pages/Home';
import History from './pages/History';
import Tasks from './pages/Tasks';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Card from './components/Card';
import Auth from './components/Auth';
import SettingsModal from './components/SettingsModal';
import BottomNav from './components/BottomNav';

function App() {
  const { user, isLoading } = useAuth();
  const userId = user ? user.uid : null;

  const { score, addPoints } = useScore(userId);
  const timer = useTimer(userId, { addPoints });
  const { tasks } = useTasks(userId);
  const { settings, updateDateFormat, updateTimeFormat } = useSettings();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const dailySummary = aggregateSessionsByDay(timer.sessions);

  // Gemini Note: This logic finds the summary data for today.
  // It compares the date part of the summary entry with today's date.
  const todayString = new Date().toLocaleDateString('en-CA');
  const todaysSummary = dailySummary.find(
    (day) => new Date(day.date).toLocaleDateString('en-CA') === todayString
  );
  const dailyScore = todaysSummary ? todaysSummary.totalScore : 0;

  const handleExportSessions = () => {
    if (timer.sessions.length === 0) {
      alert('There are no sessions to export.');
      return;
    }

    const csvData = exportSessionsToCSV(
      timer.sessions,
      settings.dateFormat,
      settings.timeFormat
    );

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'session_history.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-prompt">
          <Card title="Welcome to Productivity Tracker">
            <p>Please sign in to continue.</p>
            <Auth />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Gemini Note: We now use HashRouter. The `basename` prop is removed as it's not needed. */}
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                score={score}
                dailyScore={dailyScore}
                dailySummary={dailySummary}
                timer={timer}
                tasks={tasks}
                onOpenSettings={() => setIsSettingsModalOpen(true)}
              />
            }
          />
          <Route
            path="/history"
            element={
              <History
                sessions={timer.sessions}
                dailySummary={dailySummary}
                dateFormat={settings.dateFormat}
                timeFormat={settings.timeFormat}
                tasks={tasks}
                isMobile={isMobile}
                onOpenSettings={() => setIsSettingsModalOpen(true)}
                deleteSessions={timer.deleteSessions}
                updateSession={timer.updateSession}
              />
            }
          />
          <Route
            path="/tasks"
            element={<Tasks onOpenSettings={() => setIsSettingsModalOpen(true)} />}
          />
          <Route
            path="/privacy"
            element={<PrivacyPolicy onOpenSettings={() => setIsSettingsModalOpen(true)} />}
          />
          <Route
            path="/terms"
            element={<TermsOfService onOpenSettings={() => setIsSettingsModalOpen(true)} />}
          />
        </Routes>
        {/* Gemini Note: Moved BottomNav inside HashRouter to provide routing context. */}
        {isMobile && <BottomNav onOpenSettings={() => setIsSettingsModalOpen(true)} />}
      </HashRouter>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        updateDateFormat={updateDateFormat}
        updateTimeFormat={updateTimeFormat}
        onClearSessions={timer.clearSessions}
        onExportSessions={handleExportSessions}
        onImportSessions={timer.importSessions}
      />
    </>
  );
}

export default App;