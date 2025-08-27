// src/pages/Home.jsx

import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';

import Header from '../components/Header';
import Card from '../components/Card';
import ScoreDisplay from '../components/ScoreDisplay';
import Timer from '../features/Timer';

export default function Home({
  dailyScore,
  timer,
  onOpenSettings,
}) {
  const { user } = useAuth();
  const { tasks } = useTasks(user?.uid);

  return (
    <div className="app-container">
      <Header onOpenSettings={onOpenSettings} />
      <div className="app-layout">
        <main className="main-content">
          <Card title="Focus Timer">
            <Timer
              elapsedTime={timer.elapsedTime}
              isActive={timer.isActive}
              isPaused={timer.isPaused}
              pendingSession={timer.pendingSession}
              tasks={tasks}
              startTimer={timer.startTimer}
              pauseTimer={timer.pauseTimer}
              stopTimer={timer.stopTimer}
              saveSession={timer.saveSession}
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
          <Card title="Today's Score">
            <ScoreDisplay score={dailyScore} />
          </Card>
          <Card title="Actions">
            <div className="actions-container">
              <Link to="/tasks" className="button-secondary">
                Manage Tasks
              </Link>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}