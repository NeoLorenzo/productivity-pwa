// src/pages/Home.jsx

import { useScore } from '../hooks/useScore';
import { useTimer } from '../hooks/useTimer';
import { useSettings } from '../hooks/useSettings'; // Import new hook
import ScoreDisplay from '../components/ScoreDisplay';
import Timer from '../features/Timer';
import SettingsManager from '../components/SettingsManager';
import DisplaySettings from '../components/DisplaySettings'; // Import new component
import { DEFAULTS } from '../constants';

export default function Home() {
  const { score, addPoints, clearScore } = useScore();
  const timer = useTimer();
  const { settings, updateDateFormat, updateTimeFormat } = useSettings(); // Use the hook

  const handleCompleteTask = () => {
    addPoints(DEFAULTS.SCORE_INCREMENT);
  };

  return (
    <div className="home-container">
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
        // Pass display settings down
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