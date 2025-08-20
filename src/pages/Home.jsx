// src/pages/Home.jsx

import { useScore } from '../hooks/useScore';
import ScoreDisplay from '../components/ScoreDisplay';
import { DEFAULTS } from '../constants';

export default function Home() {
  // Gemini Note: The useScore hook is expected to provide the current score
  // and a function to add points. The score should persist on refresh.
  const { score, addPoints } = useScore();

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
    </div>
  );
}