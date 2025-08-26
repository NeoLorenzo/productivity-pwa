{/*src/App.jsx*/}

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useScore } from './hooks/useScore';
import { useTimer } from './hooks/useTimer';
import { useSettings } from './hooks/useSettings';
import { aggregateSessionsByDay } from './utils/sessionAggregators';

import Home from './pages/Home';
import History from './pages/History';
import Card from './components/Card';
import Auth from './components/Auth';
import SettingsModal from './components/SettingsModal';

function App() {
  const { user, isLoading } = useAuth();
  const userId = user ? user.uid : null;

  const { score, addPoints, clearScore } = useScore(userId);
  const timer = useTimer(userId);
  const { settings, updateDateFormat, updateTimeFormat } = useSettings();

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const dailySummary = aggregateSessionsByDay(timer.sessions);

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
      <BrowserRouter basename="/productivity-pwa/">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                score={score}
                addPoints={addPoints}
                timer={timer}
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
                onOpenSettings={() => setIsSettingsModalOpen(true)}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        updateDateFormat={updateDateFormat}
        updateTimeFormat={updateTimeFormat}
        onClearScore={clearScore}
        onClearSessions={timer.clearSessions}
      />
    </>
  );
}

export default App;