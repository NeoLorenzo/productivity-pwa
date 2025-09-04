// src/pages/Dashboard.jsx

import React, { useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { generateHeatmapData } from '../utils/heatmapUtils';

import Card from '../components/Card';
import Heatmap from '../components/Heatmap';
import HeatmapModal from '../components/HeatmapModal';
import HarmonyScoreDisplay from '../components/HarmonyScoreDisplay';
import TimeDistributionChart from '../components/TimeDistributionChart';

export default function Dashboard({
  dailySummary,
  harmonyScore,
  totalProductivityPoints,
  totalPlayPoints,
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isHeatmapModalOpen, setIsHeatmapModalOpen] = useState(false);
  const [heatmapModalData, setHeatmapModalData] = useState({ title: '', data: {}, valueKey: '' });

  // Gemini Note: Calculate average daily time spent on productivity and play.
  const numberOfDays = dailySummary.length > 0 ? dailySummary.length : 1;
  const totalProductivitySeconds = dailySummary.reduce((acc, day) => acc + day.totalDuration, 0);
  const totalPlaySeconds = dailySummary.reduce((acc, day) => acc + day.totalPlayDuration, 0);
  
  const avgProductivitySeconds = totalProductivitySeconds / numberOfDays;
  const avgPlaySeconds = totalPlaySeconds / numberOfDays;

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
      <div className="app-layout">
        <div className="dashboard-grid">
          <Card title="Harmony Score">
            <HarmonyScoreDisplay
              harmonyScore={harmonyScore}
              productivityPoints={totalProductivityPoints}
              playPoints={totalPlayPoints}
            />
          </Card>
          <Card title="Average Day">
            <TimeDistributionChart
              avgProductivitySeconds={avgProductivitySeconds}
              avgPlaySeconds={avgPlaySeconds}
            />
          </Card>
        </div>
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