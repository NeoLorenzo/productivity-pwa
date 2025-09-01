// src/components/BottomNav.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * @description A bottom navigation bar for mobile view.
 * @returns {JSX.Element}
 */
export default function BottomNav() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={pathname === '/' ? 'active' : ''}>
        Home
      </Link>
      <Link to="/history" className={pathname === '/history' ? 'active' : ''}>
        History
      </Link>
      <Link to="/strategy" className={pathname === '/strategy' ? 'active' : ''}>
        Strategy
      </Link>
      <Link to="/profile" className={pathname === '/profile' ? 'active' : ''}>
        Profile
      </Link>
    </nav>
  );
}