// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth';

/**
 * @description The main header for the application.
 * @returns {JSX.Element}
 */
export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>
          <Link to="/" className="header-link">Productivity Tracker</Link>
        </h1>
        <Auth />
      </div>
    </header>
  );
}