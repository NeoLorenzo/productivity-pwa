// src/pages/Home.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { generateHeatmapData } from '../utils/heatmapUtils';

import Header from '../components/Header';
import Card from '../components/Card';
import ScoreDisplay from '../components/ScoreDisplay';
import Timer from '../features/Timer';
import Heatmap from '../components/Heatmap';
import HeatmapModal from '../components/HeatmapModal';
import QuickAddSessionModal from '../components/QuickAddSessionModal';

export default function Home({
  dailyScore,
  dailySummary,
  timer,
  onOpenSettings,
}) {
  const { user } = useAuth();
  const { tasks } = useTasks(user?.uid);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isHeatmapModalOpen, setIsHeatmapModalOpen] = useState(false);
  const [heatmapModalData, setHeatmapModalData] = useState({ title: '', data: {}, valueKey: '' });
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);

  // Generate responsive data for the dashboard
  const durationHeatmapData = generateHeatmapData(dailySummary, 'totalDuration', isMobile);
  const scoreHeatmapData = generateHeatmapData(dailySummary, 'totalScore', isMobile);

  const handleHeatmapClick = (title, valueKey) => {
    // Always generate full-year data for the modal
    const fullYearData = generateHeatmapData(dailySummary, valueKey, false);
    setHeatmapModalData({ title, data: fullYearData, valueKey });
    setIsHeatmapModalOpen(true);
  };

  return (
    <>
      <div className="app-container">
        <Header onOpenSettings={onOpenSettings} title="Home" />
        <div className="app-layout">
          {isMobile ? (
            // Gemini Note: Mobile layout reordered to prioritize the score.
            // The <main> and <aside> tags are omitted for a simple flex column.
            <>
              <Card title="Today's Score">
                <ScoreDisplay score={dailyScore} />
              </Card>
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
                />
              </Card>
              <Card title="Actions">
                <div className="actions-container">
                  <button
                    onClick={() => setIsQuickAddModalOpen(true)}
                    className="button-secondary"
                  >
                    Quick Add Session
                  </button>
                  <Link to="/tasks" className="button-secondary">
                    Manage Tasks
                  </Link>
                </div>
              </Card>
              <Card title="Activity Overview">
                <div className="activity-heatmaps">
                  <Heatmap
                    title="Daily Work Duration"
                    data={durationHeatmapData}
                    valueKey="totalDuration"
                    onClick={() => handleHeatmapClick('Daily Work Duration', 'totalDuration')}
                  />
                  <Heatmap
                    title="Daily Score Earned"
                    data={scoreHeatmapData}
                    valueKey="totalScore"
                    onClick={() => handleHeatmapClick('Daily Score Earned', 'totalScore')}
                  />
                </div>
              </Card>
            </>
          ) : (
            // Desktop layout remains the same
            <>
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
                  />
                </Card>
                <Card title="Activity Overview">
                  <div className="activity-heatmaps">
                    <Heatmap
                      title="Daily Work Duration"
                      data={durationHeatmapData}
                      valueKey="totalDuration"
                      onClick={() => handleHeatmapClick('Daily Work Duration', 'totalDuration')}
                    />
                    <Heatmap
                      title="Daily Score Earned"
                      data={scoreHeatmapData}
                      valueKey="totalScore"
                      onClick={() => handleHeatmapClick('Daily Score Earned', 'totalScore')}
                    />
                  </div>
                </Card>
              </main>
              <aside className="sidebar">
                <Card title="Today's Score">
                  <ScoreDisplay score={dailyScore} />
                </Card>
                <Card title="Actions">
                  <div className="actions-container">
                    <button
                      onClick={() => setIsQuickAddModalOpen(true)}
                      className="button-secondary"
                    >
                      Quick Add Session
                    </button>
                    <Link to="/tasks" className="button-secondary">
                      Manage Tasks
                    </Link>
                  </div>
                </Card>
              </aside>
            </>
          )}
        </div>
      </div>
      <HeatmapModal
        isOpen={isHeatmapModalOpen}
        onClose={() => setIsHeatmapModalOpen(false)}
        title={heatmapModalData.title}
        data={heatmapModalData.data}
        valueKey={heatmapModalData.valueKey}
      />
      <QuickAddSessionModal
        isOpen={isQuickAddModalOpen}
        onClose={() => setIsQuickAddModalOpen(false)}
        tasks={tasks}
        onSubmit={timer.addManualSession}
      />
    </>
  );
}