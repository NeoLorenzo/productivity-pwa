// src/components/Header.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
        <nav className="header-actions">
          {!isMobile && (
            <>
              <Link to="/" className={`button-secondary ${pathname === '/' ? 'active' : ''}`}>
                Timer
              </Link>
              <Link to="/dashboard" className={`button-secondary ${pathname === '/dashboard' ? 'active' : ''}`}>
                Dashboard
              </Link>
              <Link to="/history" className={`button-secondary ${pathname === '/history' ? 'active' : ''}`}>
                History
              </Link>
              <Link to="/strategy" className={`button-secondary ${pathname === '/strategy' ? 'active' : ''}`}>
                Strategy
              </Link>
              <Link to="/profile" className={`button-secondary ${pathname === '/profile' ? 'active' : ''}`}>
                Profile
              </Link>
            </>
          )}
          <button onClick={onOpenSettings} className="icon-button" aria-label="Settings">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.58-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.49.49 0 0 0-.48-.44H9.14a.49.49 0 0 0-.48.44l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.58.22l-1.92 3.32a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32a.49.49 0 0 0 .58.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54a.49.49 0 0 0 .48.44h3.84a.49.49 0 0 0 .48.44l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96a.49.49 0 0 0 .58-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </nav>
      </div>
    </header>
  );
}