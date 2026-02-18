import React from 'react';
import { useAuth } from '../components/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  // Platform URLs - configure these based on deployment
  const VIRTUSPACE_URL = process.env.REACT_APP_VIRTUSPACE_URL || 'http://localhost:3005';
  const VIRTUSPHERE_URL = process.env.REACT_APP_VIRTUSPHERE_URL || 'http://localhost:3025';
  const VIRTUMIND_URL = process.env.REACT_APP_VIRTUMIND_URL || 'http://localhost:3035';

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🌌 VirtuVerse Studio</h1>
        <div className="user-info">
          <span>Welcome, {user?.name || 'User'}</span>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome to VirtuVerse Studio</h2>
          <p>
            VirtuVerse Studio is your gateway to the complete E2E Virtualization & Simulation Universe.
            Choose a platform below to get started.
          </p>
          <p>
            <strong>Your Role:</strong> {user?.role === 'admin' ? 'Administrator' : 'User'}
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card" style={{ cursor: 'pointer' }} onClick={() => window.open(VIRTUSPACE_URL, '_blank')}>
            <h3>🌌 VirtuSpace</h3>
            <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
              Simulation & Virtualization Platform
            </p>
            <ul>
              <li><strong>V-Orchestrator:</strong> Simulation orchestration</li>
              <li><strong>EnviHub:</strong> Virtualization tools</li>
              <li><strong>PlantHub:</strong> Manufacturing simulation</li>
            </ul>
            <div style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#667eea', color: 'white', borderRadius: '8px', textAlign: 'center', fontWeight: '600' }}>
              Launch VirtuSpace →
            </div>
          </div>

          <div className="feature-card" style={{ cursor: 'pointer' }} onClick={() => window.open(VIRTUSPHERE_URL, '_blank')}>
            <h3>📊 VirtuSphere</h3>
            <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
              Analytics & Visualization Platform
            </p>
            <ul>
              <li><strong>V-Analyzer:</strong> Grafana-style dashboards</li>
              <li><strong>V-DevContainers:</strong> DevContainer generation</li>
              <li><strong>V-Assessor:</strong> Assessment & evaluation</li>
              <li><strong>Real-time Monitoring:</strong> Live metrics</li>
            </ul>
            <div style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#6366f1', color: 'white', borderRadius: '8px', textAlign: 'center', fontWeight: '600' }}>
              Launch VirtuSphere →
            </div>
          </div>

          <div className="feature-card" style={{ cursor: 'pointer' }} onClick={() => window.open(VIRTUMIND_URL, '_blank')}>
            <h3>🧠 VirtuMind</h3>
            <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
              AI & Intelligence Platform
            </p>
            <ul>
              <li><strong>AI Optimization:</strong> ML-powered insights</li>
              <li><strong>Predictive Analytics:</strong> Forecasting</li>
              <li><strong>Intelligent Automation:</strong> Smart workflows</li>
              <li><strong>Natural Language:</strong> Query interface</li>
            </ul>
            <div style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#8b5cf6', color: 'white', borderRadius: '8px', textAlign: 'center', fontWeight: '600' }}>
              Launch VirtuMind →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
