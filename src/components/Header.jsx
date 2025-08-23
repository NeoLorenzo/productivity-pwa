// src/components/Header.jsx

import React from 'react';
import Auth from './Auth';

/**
 * @description The main header for the application.
 * @returns {JSX.Element}
 */
export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Productivity Tracker</h1>
        <Auth />
      </div>
    </header>
  );
}