// src/components/Card.jsx

import React from 'react';

/**
 * @description A reusable card component for wrapping content sections.
 * @param {{
 *   title?: string,
 *   children: React.ReactNode,
 *   className?: string,
 *   headerActions?: React.ReactNode
 * }} props
 * @returns {JSX.Element}
 */
export default function Card({ title, children, className = '', headerActions = null }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-header">
          <h2 className="card-title">{title}</h2>
          {headerActions && <div className="card-header-actions">{headerActions}</div>}
        </div>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
}