// src/features/Timer/SessionImporter.jsx

import React, { useRef } from 'react';

/**
 * @description A component to handle CSV file uploads for importing sessions.
 * @param {{ onImport: (sessions: Array<object>) => void }} props
 * @returns {JSX.Element}
 */
export default function SessionImporter({ onImport }) {
  // Gemini Note: We use a ref to access the file input element programmatically,
  // which allows us to style a button or label as the trigger, providing a better UX
  // than the default file input button.
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        // The onImport prop is expected to be a function that handles the parsed data.
        onImport(e.target.result);
      } catch (error) {
        alert(`Error parsing CSV: ${error.message}`);
      }
    };

    reader.onerror = () => {
      alert('Failed to read the file.');
    };

    reader.readAsText(file);

    // Reset the input value to allow uploading the same file again
    event.target.value = null;
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="session-importer">
      <p>Have old sessions? Import them from a CSV file.</p>
      <small>
        Required columns: <strong>Date, Start Time, End Time, Work Duration, Session Score, Completed Tasks, Notes, Location (Lat,Lon)</strong>
      </small>
      <br />
      <button onClick={handleClick} className="button-secondary">
        Import Sessions
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        style={{ display: 'none' }}
      />
    </div>
  );
}