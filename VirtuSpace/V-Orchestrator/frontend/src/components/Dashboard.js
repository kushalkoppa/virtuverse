import React from 'react';

function Dashboard() {
  return (
    <div className="page-section">
      <h2>V-Orchestrator Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>24</h3>
          <p>Total Simulations</p>
        </div>
        <div className="stat-card">
          <h3>3</h3>
          <p>Running Now</p>
        </div>
        <div className="stat-card">
          <h3>18</h3>
          <p>Completed Today</p>
        </div>
        <div className="stat-card">
          <h3>95%</h3>
          <p>Success Rate</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>About V-Orchestrator</h3>
        <p>
          V-Orchestrator is the simulation orchestration platform that manages and coordinates
          open-loop and closed-loop simulations across EnviHub and PlantHub platforms.
        </p>
        <ul>
          <li><strong>Open-Loop Simulations:</strong> Execute pre-defined scenarios without feedback</li>
          <li><strong>Closed-Loop Simulations:</strong> Interactive simulations with real-time feedback</li>
          <li><strong>Results Integration:</strong> Send simulation data to V-Analyzer for visualization</li>
          <li><strong>Resource Management:</strong> Optimize compute resources for efficient execution</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
