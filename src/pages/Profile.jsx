// src/pages/Profile.jsx

import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { auth } from '../firebase';
import { useAuth } from '../hooks/useAuth';

/**
 * @description A page for displaying user profile information and actions.
 */
export default function Profile({ onOpenSettings }) {
  const { user } = useAuth();

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      auth.signOut();
    }
  };

  return (
    <div className="app-container">
      <Header onOpenSettings={onOpenSettings} title="Profile" />
      <div className="app-layout" style={{ maxWidth: '800px' }}>
        <Card title="User Profile">
          {user && (
            <div className="profile-details">
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          )}
          <div className="profile-actions">
            <button onClick={handleSignOut} className="button-danger">
              Sign Out
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}