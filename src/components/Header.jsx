// src/components/Header.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from './Auth';

/**
 * @description The main header for the application.
 * @param {{ onOpenSettings: () => void }} props
 * @returns {JSX.Element}
 */
export default function Header({ onOpenSettings }) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>
          <Link to="/" className="header-link">Productivity Tracker</Link>
        </h1>
        <div className="header-actions">
          {/* Gemini Note: The History button is now in the header and is hidden
              when the user is already on the /history page. */}
          {pathname !== '/history' && (
            <Link to="/history" className="button-secondary">
              History
            </Link>
          )}
          <button onClick={onOpenSettings} className="button-secondary">
            Settings
          </button>
          <Auth />
        </div>
      </div>
    </header>
  );
}