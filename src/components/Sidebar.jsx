// src/components/Sidebar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * @description A vertical sidebar for primary application navigation on desktop.
 * @param {{ isCollapsed: boolean, onToggle: () => void }} props
 * @returns {JSX.Element}
 */
export default function Sidebar({ isCollapsed, onToggle }) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <aside className={`sidebar-nav ${isCollapsed ? 'collapsed' : ''}`}>
      <nav className="sidebar-nav-main">
        <Link to="/dashboard" className={pathname === '/dashboard' ? 'active' : ''} title="Dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Dashboard</span>
        </Link>
        <Link to="/" className={pathname === '/' ? 'active' : ''} title="Timer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>Timer</span>
        </Link>
        <Link to="/history" className={pathname === '/history' ? 'active' : ''} title="History">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6"></path><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
          <span>History</span>
        </Link>
        <Link to="/strategy" className={pathname === '/strategy' ? 'active' : ''} title="Strategy">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span>Strategy</span>
        </Link>
        <Link to="/profile" className={pathname === '/profile' ? 'active' : ''} title="Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Profile</span>
        </Link>
      </nav>
      <div className="sidebar-nav-footer">
        <button onClick={onToggle} className="sidebar-toggle" title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
        </button>
      </div>
    </aside>
  );
}