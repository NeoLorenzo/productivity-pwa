// src/utils/goalUtils.js

/**
 * @description Calculates the current progress for all active, average-based goals.
 * @param {object} goals - The user's goals object.
 * @param {Array<object>} dailySummary - The user's aggregated session data.
 * @returns {object} An object containing the progress for each goal type.
 */
export function calculateGoalProgress(goals, dailySummary) {
  const progress = {};
  const now = new Date();
  const startOfToday = new Date(now).setHours(0, 0, 0, 0);

  for (const goalType of ['taskScore', 'timeWorked', 'productivityPoints']) {
    const goal = goals[goalType];

    // Check if a valid, active goal is set
    if (goal && goal.target > 0 && goal.endDate) {
      const goalEndDate = new Date(goal.endDate);
      goalEndDate.setHours(23, 59, 59, 999); // Ensure end date includes the whole day

      if (goalEndDate >= now) {
        // Filter for summaries within the goal period (from today onwards)
        const relevantSummaries = dailySummary.filter(day => {
          const dayDate = new Date(day.date);
          return dayDate >= startOfToday && dayDate <= goalEndDate;
        });

        if (relevantSummaries.length > 0) {
          const periodTotals = relevantSummaries.reduce((acc, day) => {
            acc.taskScore += day.totalScore;
            acc.timeWorked += day.totalDuration / 60; // In minutes
            acc.productivityPoints += day.totalProductivityPoints;
            return acc;
          }, { taskScore: 0, timeWorked: 0, productivityPoints: 0 });

          const numberOfDaysWithActivity = relevantSummaries.length;
          const currentAverage = periodTotals[goalType] / numberOfDaysWithActivity;

          progress[goalType] = {
            current: currentAverage,
            target: goal.target,
            percentage: Math.min(100, (currentAverage / goal.target) * 100),
          };
        }
      }
    }
  }

  return progress;
}