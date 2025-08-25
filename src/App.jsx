{/*src/App.jsx*/}

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

function App() {
  const { user, isLoading } = useAuth();
  const userId = user ? user.uid : null;

  const { score, addPoints, clearScore } = useScore(userId);
  const timer = useTimer(userId);
  const { settings, updateDateFormat, updateTimeFormat } = useSettings();

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
    <BrowserRouter basename="/productivity-pwa/">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              score={score}
              addPoints={addPoints}
              clearScore={clearScore}
              timer={timer}
              settings={settings}
              updateDateFormat={updateDateFormat}
              updateTimeFormat={updateTimeFormat}
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
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;