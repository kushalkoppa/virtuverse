import React from 'react';

function Dashboard() {
  return (
    <div className="page-container">
      <h2 className="page-title">Dashboard</h2>
      <p className="page-description">
        Welcome to EnviHub - Your central hub for virtualization and simulation tools
      </p>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <h3 className="card-title">🔧 Tool Interfaces</h3>
          <div className="card-content">
            <p>Connect to IPG CarMaker, PreScan, Simulink, and other simulation tools</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-success">3 Tools Connected</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">📚 Model Library</h3>
          <div className="card-content">
            <p>Browse and manage your simulation models across different tools</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-info">12 Models Available</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">✏️ Model Editor</h3>
          <div className="card-content">
            <p>Create, edit, and configure simulation models with intuitive interface</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-warning">2 In Progress</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">🔗 Sharing Hub</h3>
          <div className="card-content">
            <p>Share models with OEMs, suppliers, and internal Bosch domains</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-info">5 Active Shares</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">🎯 Platform Capabilities</h3>
        <div className="card-content">
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>Unified Tool Access:</strong> Single interface for multiple simulation tools</li>
            <li><strong>Model Storage:</strong> Centralized repository for all simulation models</li>
            <li><strong>External Collaboration:</strong> Share models with OEMs and suppliers securely</li>
            <li><strong>Internal Usage:</strong> Enable cross-domain collaboration within Bosch</li>
            <li><strong>Model Management:</strong> Version control, editing, and validation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
