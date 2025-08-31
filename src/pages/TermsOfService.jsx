// src/pages/TermsOfService.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

/**
 * @description A page displaying the application's Terms of Service.
 */
export default function TermsOfService({ onOpenSettings }) {
  return (
    <div className="app-container">
      <Header onOpenSettings={onOpenSettings} title="Terms of Service" />
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
              Please read these Terms of Service ("Terms") carefully before using the Productivity Tracker application (the "Service").
            </p>
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h3>1. Use of the Service</h3>
            <p>
              The Service is provided to you for personal, non-commercial use. You may not use the Service for any illegal or unauthorized purpose. You are responsible for all data, text, and other content that you create and store within the Service.
            </p>

            <h3>2. Accounts</h3>
            <p>
              When you create an account with us by signing in with Google, you must provide us with information that is accurate, complete, and current at all times. You are responsible for safeguarding your account.
            </p>

            <h3>3. Intellectual Property</h3>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of the project owner.
            </p>

            <h3>4. Termination</h3>
            <p>
              We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or use the data-clearing features provided.
            </p>

            <h3>5. Limitation of Liability</h3>
            <p>
              In no event shall the project owner be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
            </p>

            <h3>6. Changes</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
            </p>

            <h3>7. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please refer to the project's GitHub repository.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}