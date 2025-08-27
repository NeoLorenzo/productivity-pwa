// src/utils/heatmapUtils.js

import { formatDuration } from './formatters';

const TOTAL_MOBILE_DAYS = 120; // Approx 4 months

/**
 * @description Generates heatmap data, responsive to mobile or desktop views.
 * @param {Array<object>} dailySummary - Aggregated session data.
 * @param {'totalDuration' | 'totalScore'} valueKey - The key for heatmap intensity.
 * @param {boolean} isMobile - If true, generates the last 4 months; otherwise, the full year.
 * @returns {{
 *   monthLabels: Array<{label: string, colStart: number}>,
 *   days: Array<{date: string, value: number, level: number}>
 * }}
 */
export function generateHeatmapData(dailySummary, valueKey, isMobile = false) {
  const dataMap = new Map(
    dailySummary.map((item) => [
      new Date(item.date).toLocaleDateString('en-CA'),
      item[valueKey],
    ])
  );

  const now = new Date();
  const days = [];
  const monthLabels = [];
  let lastMonth = -1;

  const maxValue = Math.max(...Array.from(dataMap.values()), 1);
  const levelThresholds = [
    maxValue * 0.01,
    maxValue * 0.25,
    maxValue * 0.5,
    maxValue * 0.75,
  ];

  // Determine the date range based on the view type
  const startDate = isMobile
    ? new Date(new Date().setDate(now.getDate() - (TOTAL_MOBILE_DAYS - 1)))
    : new Date(now.getFullYear(), 0, 1);
  const endDate = isMobile ? now : new Date(now.getFullYear(), 11, 31);

  // Add placeholders to align the first day correctly
  const startDayOfWeek = (startDate.getDay() + 6) % 7; // Monday = 0
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({ date: `placeholder-${i}`, level: -1 });
  }

  let dayCount = 0;
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d);
    const dateString = currentDate.toLocaleDateString('en-CA');
    let dayData;

    if (!isMobile && currentDate > now) {
      dayData = { date: dateString, value: 0, level: -2 }; // Future day
    } else {
      const value = dataMap.get(dateString) || 0;
      let level = 0;
      if (value > 0) {
        level = levelThresholds.findIndex((threshold) => value <= threshold) + 1;
        if (level === 0) level = 5;
      }
      dayData = { date: dateString, value, level };
    }
    days.push(dayData);

    // Capture month labels
    const month = currentDate.getMonth();
    if (month !== lastMonth) {
      const totalDaysProcessed = startDayOfWeek + dayCount;
      const colStart = Math.floor(totalDaysProcessed / 7) + 1;
      const lastLabel = monthLabels[monthLabels.length - 1];
      if (!lastLabel || colStart > lastLabel.colStart + 3) {
        monthLabels.push({
          label: currentDate.toLocaleString('default', { month: 'short' }),
          colStart: colStart,
        });
        lastMonth = month;
      }
    }
    dayCount++;
  }

  return { monthLabels, days };
}

/**
 * @description Creates a tooltip string for a heatmap cell.
 * @param {object} day - The day object from the heatmap data.
 * @param {'totalDuration' | 'totalScore'} valueKey - The key to determine the tooltip format.
 * @returns {string}
 */
export function formatHeatmapTooltip(day, valueKey) {
  const date = new Date(day.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // Ensure consistent date formatting
  });

  if (valueKey === 'totalDuration') {
    const duration = formatDuration(day.value);
    return `${duration} on ${formattedDate}`;
  }
  
  const points = day.value === 1 ? 'point' : 'points';
  return `${day.value} ${points} on ${formattedDate}`;
}