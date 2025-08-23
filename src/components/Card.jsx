// src/components/Card.jsx

import React from 'react';

/**
 * @description A reusable card component for wrapping content sections.
 * @param {{
 *   title?: string,
 *   children: React.ReactNode,
 *   className?: string
 * }} props
 * @returns {JSX.Element}
 */
export default function Card({ title, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">{children}</div>
    </div>
  );
}