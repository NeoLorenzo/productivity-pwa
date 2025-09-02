// src/features/Strategy/FormulaSettings.jsx

import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';

/**
 * @description A component for viewing and editing the Productivity & Play Points formulas.
 * @param {{
 *   formula: { timeDivisor: number, playTimeDivisor: number },
 *   updateFormula: (newFormula: object) => void
 * }} props
 */
export default function FormulaSettings({ formula, updateFormula }) {
  const [localFormula, setLocalFormula] = useState(formula);

  useEffect(() => {
    setLocalFormula(formula);
  }, [formula]);

  const handleInputChange = (key, value) => {
    setLocalFormula(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdate = (key) => {
    const newDivisor = parseInt(localFormula[key], 10);
    if (!isNaN(newDivisor) && newDivisor > 0) {
      updateFormula({ ...formula, [key]: newDivisor });
    } else {
      alert('Please enter a valid number greater than 0.');
      setLocalFormula(formula); // Reset on invalid input
    }
  };

  return (
    <Card title="Points Formulas">
      <div className="formula-group">
        <div className="formula-display-wrapper">
          <div className="formula-display">
            <span>(Prod. Time /</span>
            <input
              type="number"
              value={localFormula.timeDivisor}
              onChange={(e) => handleInputChange('timeDivisor', e.target.value)}
              onBlur={() => handleUpdate('timeDivisor')}
              className="formula-input"
              min="1"
            />
            <span>) + Score = Prod. Points</span>
          </div>
        </div>
        <p className="formula-explanation">
          A lower number makes focused time more valuable.
        </p>
      </div>

      <div className="formula-group">
        <div className="formula-display-wrapper">
          <div className="formula-display">
            <span>(Play Time /</span>
            <input
              type="number"
              value={localFormula.playTimeDivisor}
              onChange={(e) => handleInputChange('playTimeDivisor', e.target.value)}
              onBlur={() => handleUpdate('playTimeDivisor')}
              className="formula-input"
              min="1"
            />
            <span>) = Play Points</span>
          </div>
        </div>
        <p className="formula-explanation">
          A lower number makes play time "cost" more against your Harmony Score.
        </p>
      </div>
    </Card>
  );
}