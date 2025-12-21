import React from 'react';

function Dashboard() {
  return (
    <div className="page-container">
      <h2 className="page-title">Dashboard</h2>
      <p className="page-description">
        Welcome to PlantHub - Your central hub for plant modeling tools (Sensors, Actuators, Physical & Mathematical models)
      </p>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <h3 className="card-title">🔧 Tool Interfaces</h3>
          <div className="card-content">
            <p>Connect to MATLAB Simulink, Modelica, Amesim, and other plant modeling tools</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-success">3 Tools Connected</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">📚 Model Library</h3>
          <div className="card-content">
            <p>Browse and manage plant models including sensors, actuators, physical and mathematical models</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-info">15 Models Available</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">✏️ Model Editor</h3>
          <div className="card-content">
            <p>Create, edit, and configure plant models with intuitive interface</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-warning">3 In Progress</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">🔗 Sharing Hub</h3>
          <div className="card-content">
            <p>Share plant models with OEMs, suppliers, and internal Bosch domains</p>
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
            <li><strong>Plant Model Focus:</strong> Specialized in sensors, actuators, physical and mathematical models</li>
            <li><strong>Unified Tool Access:</strong> Single interface for multiple plant modeling tools</li>
            <li><strong>Model Storage:</strong> Centralized repository for all plant models</li>
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
