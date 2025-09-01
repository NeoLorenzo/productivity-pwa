// src/components/BottomNav.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

/**
 * @description A bottom navigation bar for mobile view.
 * @param {{ onOpenSettings: () => void }} props
 * @returns {JSX.Element}
 */
export default function BottomNav({ onOpenSettings }) {
  const location = useLocation();
  const { pathname } = location;

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      auth.signOut();
    }
  };

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
      <button onClick={onOpenSettings}>Settings</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </nav>
  );
}