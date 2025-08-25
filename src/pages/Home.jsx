// src/pages/Home.jsx

import { Link } from 'react-router-dom';
import { DEFAULTS } from '../constants';

import Header from '../components/Header';
import Card from '../components/Card';
import ScoreDisplay from '../components/ScoreDisplay';
import Timer from '../features/Timer';
import SettingsManager from '../components/SettingsManager';
import DisplaySettings from '../components/DisplaySettings';

export default function Home({
  score,
  addPoints,
  clearScore,
  timer,
  settings,
  updateDateFormat,
  updateTimeFormat,
}) {
  const handleCompleteTask = () => {
    addPoints(DEFAULTS.SCORE_INCREMENT);
  };

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
              pendingSession={timer.pendingSession}
              startTimer={timer.startTimer}
              pauseTimer={timer.pauseTimer}
              stopTimer={timer.stopTimer}
              saveSessionWithNotes={timer.saveSessionWithNotes}
              discardPendingSession={timer.discardPendingSession}
              importSessions={timer.importSessions}
            />
             <div className="history-link-container">
              <Link to="/history" className="button-secondary">
                View History
              </Link>
            </div>
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