// src/components/Header.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from './Auth';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * @description The main header for the application.
 * @param {{ onOpenSettings: () => void, title: string }} props
 * @returns {JSX.Element}
 */
export default function Header({ onOpenSettings, title }) {
  const location = useLocation();
  const { pathname } = location;
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>{title}</h1>
        {!isMobile && (
          <nav className="header-actions">
            <Link to="/" className={`button-secondary ${pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/history" className={`button-secondary ${pathname === '/history' ? 'active' : ''}`}>
              History
            </Link>
            <Link to="/strategy" className={`button-secondary ${pathname === '/strategy' ? 'active' : ''}`}>
              Strategy
            </Link>
            <button onClick={onOpenSettings} className="button-secondary">
              Settings
            </button>
            <Auth />
          </nav>
        )}
      </div>
    </header>
  );
}