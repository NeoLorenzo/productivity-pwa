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
          <div className="header-actions">
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
        )}
      </div>
    </header>
  );
}