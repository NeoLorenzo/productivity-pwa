// src/features/Strategy/FormulaSettings.jsx

import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';

/**
 * @description A component for viewing and editing the Productivity Points formula.
 * @param {{
 *   formula: { timeDivisor: number },
 *   updateFormula: (newFormula: object) => void
 * }} props
 */
export default function FormulaSettings({ formula, updateFormula }) {
  const [timeDivisor, setTimeDivisor] = useState(formula.timeDivisor);

  useEffect(() => {
    setTimeDivisor(formula.timeDivisor);
  }, [formula]);

  const handleUpdate = () => {
    const newDivisor = parseInt(timeDivisor, 10);
    if (!isNaN(newDivisor) && newDivisor > 0) {
      updateFormula({ ...formula, timeDivisor: newDivisor });
    } else {
      alert('Please enter a valid number greater than 0.');
      setTimeDivisor(formula.timeDivisor); // Reset on invalid input
    }
  };

  return (
    <Card title="Productivity Points Formula">
      <div className="formula-display-wrapper">
        <div className="formula-display">
          <span>(Time /</span>
          <input
            type="number"
            value={timeDivisor}
            onChange={(e) => setTimeDivisor(e.target.value)}
            onBlur={handleUpdate}
            className="formula-input"
            min="1"
          />
          <span>) + Score = Points</span>
        </div>
      </div>
      <p className="formula-explanation">
        Adjust the time divisor to change how much your focused work (in minutes) is worth. A lower number makes time more valuable.
      </p>
    </Card>
  );
}