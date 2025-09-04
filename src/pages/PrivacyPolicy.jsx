// src/pages/PrivacyPolicy.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

/**
 * @description A page displaying the application's Privacy Policy.
 */
export default function PrivacyPolicy() {
  return (
    <div className="app-layout" style={{ maxWidth: '800px' }}>
      <div className="history-page-controls">
        <Link to="/" className="button-secondary">
          ← Back to Home
        </Link>
      </div>
      <Card>
        <div className="legal-content">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          <p>
            This Privacy Policy describes how your personal information is collected, used, and shared when you use the Productivity Tracker application (the "Service").
          </p>

          <h3>1. Information We Collect</h3>
          <p>When you use the Service, we collect the following types of information:</p>
          <ul>
            <li>
              <strong>Account Information:</strong> When you sign in using your Google account, we receive your basic profile information from Google, such as your name, email address, and a unique user ID. We use this solely to identify you within the application and associate your data with your account.
            </li>
            <li>
              <strong>User-Generated Data:</strong> All data you create within the application is stored and associated with your account. This includes:
              <ul>
                <li>Timer session data (start time, end time, duration, notes, location if provided).</li>
                <li>Custom tasks and their associated scores.</li>
                <li>Application settings (e.g., date and time format preferences).</li>
              </ul>
            </li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain the Service.</li>
            <li>Persist your data across different devices and sessions.</li>
            <li>Allow you to track your productivity metrics and history.</li>
            <li>Improve and personalize your experience.</li>
          </ul>
          <p><strong>We will never sell, rent, or share your personal information with third parties for marketing purposes.</strong></p>

          <h3>3. Data Storage</h3>
          <p>
            Your data is securely stored using Google's Firebase (Firestore) services. Firebase has its own robust security and privacy measures, which you can review on the Google Firebase website.
          </p>

          <h3>4. Data Control</h3>
          <p>You have full control over your data. You can:</p>
          <ul>
            <li><strong>Delete Tasks:</strong> You can delete any task you have created at any time.</li>
            <li><strong>Clear Session History:</strong> The application provides a feature in the settings to permanently delete all your logged sessions.</li>
          </ul>

          <h3>5. Changes to This Policy</h3>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
          </p>

          <h3>6. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please refer to the project's GitHub repository.
          </p>
        </div>
      </Card>
    </div>
  );
}