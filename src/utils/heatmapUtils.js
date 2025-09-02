// src/utils/heatmapUtils.js

import { formatDuration } from './formatters';

const TOTAL_MOBILE_DAYS = 120; // Approx 4 months

/**
 * @description Generates heatmap data, responsive to mobile or desktop views.
 * @param {Array<object>} dailySummary - Aggregated session data.
 * @param {'totalDuration' | 'totalScore' | 'totalPlayDuration' | 'dailyHarmonyScore'} valueKey - The key for heatmap intensity.
 * @param {boolean} isMobile - If true, generates the last 4 months; otherwise, the full year.
 * @returns {{
 *   monthLabels: Array<{label: string, colStart: number}>,
 *   days: Array<{date: string, value: number, level: number}>
 * }}
 */
export function generateHeatmapData(dailySummary, valueKey, isMobile = false) {
  // Gemini Note: Create a map of raw values first.
  const valueMap = new Map(
    dailySummary.map((item) => [
      new Date(item.date).toLocaleDateString('en-CA'),
      item[valueKey],
    ])
  );

  // Gemini Note: Create a second map to store the processed data ({value, level}) to avoid mutation during iteration.
  const dataMap = new Map();
  const now = new Date();
  const days = [];
  const monthLabels = [];
  let lastMonth = -1;

  if (valueKey === 'dailyHarmonyScore') {
    const maxAbsValue = Math.max(...Array.from(valueMap.values()).map(v => Math.abs(v || 0)), 1);
    const thresholds = [maxAbsValue * 0.1, maxAbsValue * 0.4, maxAbsValue * 0.7];
    
    for (const [dateString, value] of valueMap.entries()) {
      let level = 0;
      if (value > 0) {
        level = thresholds.findIndex(t => value <= t) + 1;
        if (level === 0) level = 3;
      } else if (value < 0) {
        const absValue = Math.abs(value);
        level = -(thresholds.findIndex(t => absValue <= t) + 1);
        if (level === 0) level = -3;
      }
      dataMap.set(dateString, { value, level });
    }
  } else {
    const maxValue = Math.max(...Array.from(valueMap.values()), 1);
    const thresholds = [maxValue * 0.01, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75];
    for (const [dateString, value] of valueMap.entries()) {
      let level = 0;
      if (value > 0) {
        level = thresholds.findIndex(t => value <= t) + 1;
        if (level === 0) level = 5;
      }
      dataMap.set(dateString, { value, level });
    }
  }

  const startDate = isMobile
    ? new Date(new Date().setDate(now.getDate() - (TOTAL_MOBILE_DAYS - 1)))
    : new Date(now.getFullYear(), 0, 1);
  const endDate = isMobile ? now : new Date(now.getFullYear(), 11, 31);

  const startDayOfWeek = (startDate.getDay() + 6) % 7;
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({ date: `placeholder-${i}`, level: -10 });
  }

  let dayCount = 0;
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d);
    const dateString = currentDate.toLocaleDateString('en-CA');
    let dayData;

    if (!isMobile && currentDate > now) {
      dayData = { date: dateString, value: 0, level: -20 };
    } else {
      const data = dataMap.get(dateString);
      dayData = {
        date: dateString,
        value: data ? data.value : 0,
        level: data ? data.level : 0,
      };
    }
    days.push(dayData);

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
 * @param {'totalDuration' | 'totalScore' | 'totalPlayDuration' | 'dailyHarmonyScore'} valueKey - The key to determine the tooltip format.
 * @returns {string}
 */
export function formatHeatmapTooltip(day, valueKey) {
  const date = new Date(day.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  if (valueKey === 'totalDuration' || valueKey === 'totalPlayDuration') {
    const duration = formatDuration(day.value);
    return `${duration} on ${formattedDate}`;
  }

  if (valueKey === 'dailyHarmonyScore') {
    // Gemini Note: Safely access value, defaulting to 0 if it's missing.
    const value = day.value || 0;
    return `Harmony: ${value.toFixed(2)} on ${formattedDate}`;
  }
  
  const points = day.value === 1 ? 'point' : 'points';
  return `${day.value} ${points} on ${formattedDate}`;
}