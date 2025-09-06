// src/App.jsx

import { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useScore } from './hooks/useScore';
import { useTimer } from './hooks/useTimer';
import { useSettings } from './hooks/useSettings';
import { useTasks } from './hooks/useTasks';
import { useMediaQuery } from './hooks/useMediaQuery';
import { useFormula } from './hooks/useFormula';
import { useGoals } from './hooks/useGoals';
import { useTimerMode } from './hooks/useTimerMode';
import { useIntegrations } from './hooks/useIntegrations';
import { aggregateSessionsByDay } from './utils/sessionAggregators';
import { exportSessionsToCSV } from './utils/csvGenerator';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TimerPage from './pages/TimerPage';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Strategy from './pages/Strategy';
import Profile from './pages/Profile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Card from './components/Card';
import Auth from './components/Auth';
import SettingsModal from './components/SettingsModal';
import BottomNav from './components/BottomNav';

// Gemini Note: This helper function determines the header title based on the current URL.
const getTitleForPath = (path) => {
  switch (path) {
    case '/': return 'Timer';
    case '/dashboard': return 'Dashboard';
    case '/history': return 'History';
    case '/strategy': return 'Strategy';
    case '/profile': return 'Profile';
    case '/privacy': return 'Privacy Policy';
    case '/terms': return 'Terms of Service';
    default: return 'Productivity Tracker';
  }
};

// Gemini Note: The main application logic is moved into this component
// so it can access the `useLocation` hook from the router context.
function AppLayout() {
  const { user, isLoading } = useAuth();
  const userId = user ? user.uid : null;

  const { addPoints } = useScore(userId);
  const timer = useTimer(userId, { addPoints });
  const { tasks } = useTasks(userId);
  const { settings, updateDateFormat, updateTimeFormat } = useSettings();
  const { formula, updateFormula } = useFormula(userId);
  const { goals, updateGoals } = useGoals(userId);
  const { timerMode, updateTimerMode } = useTimerMode(userId);
  const { integrations, linkGitHub, unlinkGitHub } = useIntegrations(userId);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const dailySummary = aggregateSessionsByDay(timer.sessions, formula);

  const totalProductivityPoints = dailySummary.reduce((total, day) => total + day.totalProductivityPoints, 0);
  const totalPlayPoints = dailySummary.reduce((total, day) => total + day.totalPlayPoints, 0);
  const harmonyScore = dailySummary.reduce((total, day) => total + day.dailyHarmonyScore, 0);

  const handleExportSessions = () => {
    if (timer.sessions.length === 0) {
      alert('There are no sessions to export.');
      return;
    }
    const csvData = exportSessionsToCSV(timer.sessions, settings.dateFormat, settings.timeFormat);
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
          <Card title="Welcome to Productivity Tracker"><p>Please sign in to continue.</p><Auth /></Card>
        </div>
      </div>
    );
  }

  const pageTitle = getTitleForPath(location.pathname);
  const isTimerPage = location.pathname === '/';

  return (
    <>
      <div className={`app-container ${isSidebarCollapsed && !isMobile ? 'sidebar-collapsed' : ''}`}>
        <Header onOpenSettings={() => setIsSettingsModalOpen(true)} title={pageTitle} />
        <div className="app-body">
          {!isMobile && <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(prev => !prev)} />}
          <main className={`main-content-wrapper ${isTimerPage ? 'timer-page-wrapper' : ''}`}>
            <Routes>
              <Route path="/" element={<TimerPage timer={timer} tasks={tasks} timerMode={timerMode} onTimerModeChange={updateTimerMode} />} />
              <Route path="/dashboard" element={<Dashboard dailySummary={dailySummary} harmonyScore={harmonyScore} totalProductivityPoints={totalProductivityPoints} totalPlayPoints={totalPlayPoints} />} />
              <Route path="/history" element={<History sessions={timer.sessions} dailySummary={dailySummary} dateFormat={settings.dateFormat} timeFormat={settings.timeFormat} tasks={tasks} isMobile={isMobile} deleteSessions={timer.deleteSessions} updateSession={timer.updateSession} />} />
              <Route path="/strategy" element={<Strategy formula={formula} updateFormula={updateFormula} goals={goals} updateGoals={updateGoals} dailySummary={dailySummary} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </main>
        </div>
      </div>
      {isMobile && <BottomNav />}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        updateDateFormat={updateDateFormat}
        updateTimeFormat={updateTimeFormat}
        onClearSessions={timer.clearSessions}
        onExportSessions={handleExportSessions}
        onImportSessions={timer.importSessions}
        integrations={integrations}
        onLinkGitHub={linkGitHub}
        onUnlinkGitHub={unlinkGitHub}
      />
    </>
  );
}

// The root component now simply provides the Router context.
function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}

export default App;