import React, { useState, useEffect } from 'react';
import { config } from '../config';

function Dashboard() {
  const [stats, setStats] = useState({
    middlewares: { total: 0, active: 0 },
    interfaces: { total: 0, detected: 0 },
    testCases: { total: 0, ready: 0 },
    integrations: { total: 0, connected: 0 }
  });

  useEffect(() => {
    // Fetch dashboard statistics
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Simulate fetching stats
      setStats({
        middlewares: { total: 3, active: 2 },
        interfaces: { total: 3, detected: 3 },
        testCases: { total: 3, ready: 2 },
        integrations: { total: 3, connected: 3 }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Dashboard</h2>
      <p className="page-description">
        Welcome to V-Orchestrator - Your intelligent cosimulation orchestration platform for seamless integration of V-ECUs, Environment Models, and Plant Models
      </p>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card-title">🔌 Cosimulation Middleware</h3>
          <div className="card-content">
            <p>Manage multiple cosimulation middleware for integrating various model types</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-success">{stats.middlewares.active} Active</span>
              <span className="badge badge-gray" style={{ marginLeft: '0.5rem' }}>{stats.middlewares.total} Total</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">🔍 Interface Detection</h3>
          <div className="card-content">
            <p>Automatically detect and analyze model interfaces from metadata</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-info">{stats.interfaces.detected} Detected</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">🧪 Test Cases</h3>
          <div className="card-content">
            <p>Manage test cases and test scripts for simulation execution</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-warning">{stats.testCases.ready} Ready</span>
              <span className="badge badge-gray" style={{ marginLeft: '0.5rem' }}>{stats.testCases.total} Total</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">🔗 Platform Integration</h3>
          <div className="card-content">
            <p>Connect to MeDaC, EnviHub, and PlantHub for model access</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-success">{stats.integrations.connected} Connected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">🎯 V-Orchestrator Capabilities</h3>
        <div className="card-content">
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
            <li><strong>Intelligent Interface Detection:</strong> Automatically detect model interfaces from metadata provided by MeDaC, EnviHub, and PlantHub</li>
            <li><strong>Multiple Middleware Support:</strong> Accommodate various cosimulation middleware (FMI, DCP, Custom) based on use-case requirements</li>
            <li><strong>Seamless Integration:</strong> Integrate V-ECUs from MeDaC, Environment Models from EnviHub, and Plant Models from PlantHub</li>
            <li><strong>Test Execution:</strong> Manage and execute test cases/test scripts within the simulation middleware</li>
            <li><strong>Domain-Specific Orchestration:</strong> Configure integrations based on specific domains and use-cases</li>
            <li><strong>Real-Time Monitoring:</strong> Monitor cosimulation execution and model interactions in real-time</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">🏗️ Platform Architecture</h3>
        <div className="card-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#ede9fe', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>MeDaC</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>V-ECU Models</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#dbeafe', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>EnviHub</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Environment Models</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#d1fae5', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ color: '#059669', marginBottom: '0.5rem' }}>PlantHub</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Plant Models</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ color: '#d97706', marginBottom: '0.5rem' }}>V-Orchestrator</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Cosimulation Layer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
