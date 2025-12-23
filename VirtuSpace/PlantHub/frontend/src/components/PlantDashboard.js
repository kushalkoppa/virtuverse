import React from 'react';

function PlantDashboard() {
  return (
    <div className="dashboard">
      <h2>PlantHub Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>4</h3>
          <p>Plant Tools Available</p>
        </div>
        <div className="stat-card">
          <h3>2</h3>
          <p>Active Plant Models</p>
        </div>
        <div className="stat-card">
          <h3>1</h3>
          <p>Shared Models</p>
        </div>
        <div className="stat-card">
          <h3>100%</h3>
          <p>System Health</p>
        </div>
      </div>
      <div>
        <h3>Welcome to PlantHub</h3>
        <p>
          PlantHub provides a comprehensive platform for plant simulation and manufacturing tools.
          Use the navigation above to access different features:
        </p>
        <ul>
          <li><strong>Plant Tool Interfaces:</strong> Connect to plant simulation tools</li>
          <li><strong>Plant Model Library:</strong> Browse and manage plant models</li>
          <li><strong>Plant Model Editor:</strong> Create and edit plant models</li>
          <li><strong>Sharing Hub:</strong> Share models with partners</li>
        </ul>
      </div>
    </div>
  );
}

export default PlantDashboard;
