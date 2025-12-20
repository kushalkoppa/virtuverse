import React from 'react';
import { Link } from 'react-router-dom';

function VirtuSpaceDashboard() {
  return (
    <div className="dashboard">
      <h2>Welcome to VirtuSpace</h2>
      <p className="welcome-text">
        VirtuSpace is the unified platform that brings together EnviHub and PlantHub, 
        providing seamless access to virtualization, simulation, and plant manufacturing tools.
        Choose a platform below to get started.
      </p>

      <div className="platform-grid">
        <Link to="/envihub" className="platform-card">
          <div className="icon">🌐</div>
          <h3>EnviHub</h3>
          <p>
            Comprehensive platform for virtualization and simulation tools.
          </p>
          <ul>
            <li>IPG CarMaker Integration</li>
            <li>Model Library & Management</li>
            <li>External Collaboration</li>
            <li>Model Editor</li>
          </ul>
        </Link>

        <Link to="/planthub" className="platform-card">
          <div className="icon">🏭</div>
          <h3>PlantHub</h3>
          <p>
            Advanced platform for plant simulation and manufacturing tools.
          </p>
          <ul>
            <li>Plant Simulation Tools</li>
            <li>Manufacturing Process Models</li>
            <li>Factory Planning</li>
            <li>Production Optimization</li>
          </ul>
        </Link>
      </div>

      <div className="stats-section">
        <h3>Platform Overview</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>2</h4>
            <p>Integrated Platforms</p>
          </div>
          <div className="stat-card">
            <h4>8+</h4>
            <p>Available Tools</p>
          </div>
          <div className="stat-card">
            <h4>∞</h4>
            <p>Simulation Models</p>
          </div>
          <div className="stat-card">
            <h4>100%</h4>
            <p>System Health</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtuSpaceDashboard;
