import React from 'react';
import { useAuth } from '../components/AuthContext';
import { VIRTUSPACE_URL } from '../config';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🌌 VirtuVerse</h1>
        <div className="user-info">
          <span>Welcome, {user?.name || 'User'}</span>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome to VirtuVerse</h2>
          <p>
            VirtuVerse is your gateway to the complete E2E Virtualization & Simulation Universe.
            Access VirtuSpace to explore EnviHub and PlantHub platforms.
          </p>
          <p>
            <strong>Your Role:</strong> {user?.role === 'admin' ? 'Administrator' : 'User'}
          </p>
        </div>

        <div className="access-card">
          <h2>🌌 Access VirtuSpace</h2>
          <p>
            VirtuSpace integrates EnviHub and PlantHub into one unified platform.
            Click below to access all simulation and virtualization tools.
          </p>
          <a 
            href={VIRTUSPACE_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="virtuspace-link"
          >
            Launch VirtuSpace →
          </a>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🌐 EnviHub</h3>
            <ul>
              <li>IPG CarMaker Integration</li>
              <li>MATLAB Simulink Support</li>
              <li>Model Library Management</li>
              <li>External Collaboration</li>
              <li>Model Editor & Validator</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>🏭 PlantHub</h3>
            <ul>
              <li>Plant Simulation Tools</li>
              <li>Manufacturing Process Models</li>
              <li>Factory Layout Planning</li>
              <li>Production Optimization</li>
              <li>Process Simulator</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure Platform</h3>
            <ul>
              <li>User Authentication</li>
              <li>Role-Based Access Control</li>
              <li>Secure Data Management</li>
              <li>Activity Logging</li>
              <li>Password Recovery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
