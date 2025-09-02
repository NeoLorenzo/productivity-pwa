// src/pages/Dashboard.jsx

import React, { useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { generateHeatmapData } from '../utils/heatmapUtils';

import Header from '../components/Header';
import Card from '../components/Card';
import Heatmap from '../components/Heatmap';
import HeatmapModal from '../components/HeatmapModal';
import HarmonyScoreDisplay from '../components/HarmonyScoreDisplay';

export default function Dashboard({
  dailySummary,
  onOpenSettings,
  harmonyScore,
  totalProductivityPoints,
  totalPlayPoints,
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isHeatmapModalOpen, setIsHeatmapModalOpen] = useState(false);
  const [heatmapModalData, setHeatmapModalData] = useState({ title: '', data: {}, valueKey: '' });

  const durationHeatmapData = generateHeatmapData(dailySummary, 'totalDuration', isMobile);
  const playHeatmapData = generateHeatmapData(dailySummary, 'totalPlayDuration', isMobile);
  const harmonyHeatmapData = generateHeatmapData(dailySummary, 'dailyHarmonyScore', isMobile);

  const handleHeatmapClick = (title, valueKey) => {
    const fullYearData = generateHeatmapData(dailySummary, valueKey, false);
    setHeatmapModalData({ title, data: fullYearData, valueKey });
    setIsHeatmapModalOpen(true);
  };

  return (
    <>
      <div className="app-container">
        <Header onOpenSettings={onOpenSettings} title="Dashboard" />
        <div className="app-layout">
          <div className="main-content" style={{ flex: '1' }}>
            <Card title="Harmony Score">
              <HarmonyScoreDisplay
                harmonyScore={harmonyScore}
                productivityPoints={totalProductivityPoints}
                playPoints={totalPlayPoints}
              />
            </Card>
            <Card title="Activity Overview">
              <div className="activity-heatmaps">
                <div className="productivity-heatmap">
                  <Heatmap
                    title="Productivity Duration"
                    data={durationHeatmapData}
                    valueKey="totalDuration"
                    onClick={() => handleHeatmapClick('Productivity Duration', 'totalDuration')}
                  />
                </div>
                <div className="play-heatmap">
                  <Heatmap
                    title="Play Duration"
                    data={playHeatmapData}
                    valueKey="totalPlayDuration"
                    onClick={() => handleHeatmapClick('Play Duration', 'totalPlayDuration')}
                  />
                </div>
                <div className="harmony-heatmap">
                  <Heatmap
                    title="Daily Harmony"
                    data={harmonyHeatmapData}
                    valueKey="dailyHarmonyScore"
                    onClick={() => handleHeatmapClick('Daily Harmony', 'dailyHarmonyScore')}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <HeatmapModal
        isOpen={isHeatmapModalOpen}
        onClose={() => setIsHeatmapModalOpen(false)}
        title={heatmapModalData.title}
        data={heatmapModalData.data}
        valueKey={heatmapModalData.valueKey}
      />
    </>
  );
}