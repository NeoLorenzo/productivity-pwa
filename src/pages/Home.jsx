// src/pages/Home.jsx

import { useAuth } from '../hooks/useAuth'; // Import the new auth hook
import { useScore } from '../hooks/useScore';
import { useTimer } from '../hooks/useTimer';
import { useSettings } from '../hooks/useSettings';
import ScoreDisplay from '../components/ScoreDisplay';
import Timer from '../features/Timer';
import SettingsManager from '../components/SettingsManager';
import DisplaySettings from '../components/DisplaySettings';
import Auth from '../components/Auth'; // Import the new Auth component
import { DEFAULTS } from '../constants';

export default function Home() {
  const { user, isLoading } = useAuth();
  const userId = user ? user.uid : null;

  const { score, addPoints, clearScore } = useScore(userId);
  const timer = useTimer(userId);
  const { settings, updateDateFormat, updateTimeFormat } = useSettings(userId);

  const handleCompleteTask = () => {
    addPoints(DEFAULTS.SCORE_INCREMENT);
  };

  // Gemini Note: While Firebase is checking the auth state, we can show a loader.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If not loading and no user, show a login prompt.
  if (!user) {
    return (
      <div className="home-container">
        <div className="login-prompt">
          <h2>Welcome to Productivity Tracker</h2>
          <p>Please sign in to continue.</p>
          <Auth />
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Auth />
      <h1>Productivity Tracker</h1>
      <ScoreDisplay score={score} />
      <button onClick={handleCompleteTask}>
        Complete a Task (+{DEFAULTS.SCORE_INCREMENT} Points)
      </button>

      <hr />

      <Timer
        elapsedTime={timer.elapsedTime}
        isActive={timer.isActive}
        isPaused={timer.isPaused}
        sessions={timer.sessions}
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

      <hr />

      <div className="settings-group">
        <DisplaySettings
          currentDateFormat={settings.dateFormat}
          currentTimeFormat={settings.timeFormat}
          onDateFormatChange={updateDateFormat}
          onTimeFormatChange={updateTimeFormat}
        />
        <SettingsManager
          onClearScore={clearScore}
          onClearSessions={timer.clearSessions}
        />
      </div>
    </div>
  );
}