// src/pages/Home.jsx

import { useAuth } from '../hooks/useAuth';
import { useScore } from '../hooks/useScore';
import { useTimer } from '../hooks/useTimer';
import { useSettings } from '../hooks/useSettings';
import { aggregateSessionsByDay } from '../utils/sessionAggregators';
import { DEFAULTS } from '../constants';

// Import new and existing components
import Header from '../components/Header';
import Card from '../components/Card';
import ScoreDisplay from '../components/ScoreDisplay';
import Timer from '../features/Timer';
import SettingsManager from '../components/SettingsManager';
import DisplaySettings from '../components/DisplaySettings';
import Auth from '../components/Auth';

export default function Home() {
  const { user, isLoading } = useAuth();
  const userId = user ? user.uid : null;

  const { score, addPoints, clearScore } = useScore(userId);
  const timer = useTimer(userId);
  const { settings, updateDateFormat, updateTimeFormat } = useSettings(userId);

  const handleCompleteTask = () => {
    addPoints(DEFAULTS.SCORE_INCREMENT);
  };

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
    <div className="app-container">
      <Header />
      <div className="app-layout">
        <main className="main-content">
          <Card title="Focus Timer">
            <Timer
              elapsedTime={timer.elapsedTime}
              isActive={timer.isActive}
              isPaused={timer.isPaused}
              sessions={timer.sessions}
              dailySummary={dailySummary}
              pendingSession={timer.pendingSession}
              startTimer={timer.startTimer}
              pauseTimer={timer.pauseTimer}
              stopTimer={timer.stopTimer}
              saveSessionWithNotes={timer.saveSessionWithNotes}
              discardPendingSession={timer.discardPendingSession}
              importSessions={timer.importSessions}
              dateFormat={settings.dateFormat}
              timeFormat={settings.timeFormat}
            />
          </Card>
        </main>

        <aside className="sidebar">
          <Card title="Score">
            <ScoreDisplay score={score} />
            <button onClick={handleCompleteTask} className="button-full-width">
              Complete a Task (+{DEFAULTS.SCORE_INCREMENT} Points)
            </button>
          </Card>

          <Card title="Display Options">
            <DisplaySettings
              currentDateFormat={settings.dateFormat}
              currentTimeFormat={settings.timeFormat}
              onDateFormatChange={updateDateFormat}
              onTimeFormatChange={updateTimeFormat}
            />
          </Card>

          <Card title="Manage Data">
            <SettingsManager
              onClearScore={clearScore}
              onClearSessions={timer.clearSessions}
            />
          </Card>
        </aside>
      </div>
    </div>
  );
}