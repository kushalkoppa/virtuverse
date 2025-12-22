import React, { useState, useEffect } from 'react';
import { config } from '../config';

function ModelIntegration() {
  const [integrations, setIntegrations] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [platformModels, setPlatformModels] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchIntegrations();
    fetchStats();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const response = await fetch(config.endpoints.integrations);
      if (response.ok) {
        const data = await response.json();
        setIntegrations(data);
      }
    } catch (error) {
      console.error('Error fetching integrations:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${config.endpoints.integrations}/stats/summary`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const syncPlatform = async (platformId) => {
    try {
      const response = await fetch(`${config.endpoints.integrations}/${platformId}/sync`, {
        method: 'POST'
      });
      if (response.ok) {
        const result = await response.json();
        alert(`Successfully synced ${result.modelsSynced} models from ${result.platform}`);
        fetchIntegrations();
      }
    } catch (error) {
      console.error('Error syncing platform:', error);
    }
  };

  const testConnection = async (platformId) => {
    try {
      const response = await fetch(`${config.endpoints.integrations}/${platformId}/test`, {
        method: 'POST'
      });
      if (response.ok) {
        const result = await response.json();
        alert(`${result.message}\nLatency: ${result.latency}ms`);
      }
    } catch (error) {
      console.error('Error testing connection:', error);
    }
  };

  const viewModels = async (platformId) => {
    try {
      const response = await fetch(`${config.endpoints.integrations}/${platformId}/models`);
      if (response.ok) {
        const models = await response.json();
        setPlatformModels(models);
        const platform = integrations.find(i => i.id === platformId);
        setSelectedPlatform(platform);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'MeDaC': return '#8b5cf6';
      case 'EnviHub': return '#2563eb';
      case 'PlantHub': return '#059669';
      default: return '#6b7280';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'MeDaC': return '🎯';
      case 'EnviHub': return '🌐';
      case 'PlantHub': return '🌱';
      default: return '📦';
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Model Integration</h2>
      <p className="page-description">
        Integrate V-ECUs from MeDaC, Environment Models from EnviHub, and Plant Models from PlantHub
      </p>

      {stats && (
        <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <h3 className="card-title">Total Platforms</h3>
            <div className="card-content">
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>{stats.totalPlatforms}</p>
              <p style={{ color: '#6b7280' }}>{stats.connectedPlatforms} Connected</p>
            </div>
          </div>
          
          <div className="card">
            <h3 className="card-title">Total Models</h3>
            <div className="card-content">
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>{stats.totalModels}</p>
              <p style={{ color: '#6b7280' }}>Across all platforms</p>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">V-ECU Models</h3>
            <div className="card-content">
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>{stats.byType['V-ECU']}</p>
              <p style={{ color: '#6b7280' }}>From MeDaC</p>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Environment Models</h3>
            <div className="card-content">
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>{stats.byType.Environment}</p>
              <p style={{ color: '#6b7280' }}>From EnviHub</p>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Plant Models</h3>
            <div className="card-content">
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>{stats.byType.Plant}</p>
              <p style={{ color: '#6b7280' }}>From PlantHub</p>
            </div>
          </div>
        </div>
      )}

      <h3 className="card-title" style={{ marginBottom: '1rem' }}>Connected Platforms</h3>
      <div className="dashboard-grid">
        {integrations.map((integration) => (
          <div 
            key={integration.id} 
            className="card"
            style={{ 
              borderLeft: `4px solid ${getPlatformColor(integration.platform)}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h3 className="card-title">
                {getPlatformIcon(integration.platform)} {integration.platform}
              </h3>
              <div>
                <span className={`status-dot status-${integration.status}`}></span>
                <span className={`badge badge-${integration.status === 'connected' ? 'success' : 'gray'}`}>
                  {integration.status}
                </span>
              </div>
            </div>
            
            <div className="card-content">
              <p style={{ marginBottom: '0.5rem' }}><strong>Type:</strong> {integration.type}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>URL:</strong> {integration.url}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Models Available:</strong> {integration.modelsAvailable}</p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Last Sync:</strong> {new Date(integration.lastSync).toLocaleString()}
              </p>

              <div style={{ 
                padding: '1rem', 
                backgroundColor: '#f9fafb', 
                borderRadius: '6px',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getPlatformColor(integration.platform) }}>
                  {integration.modelsAvailable}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Models Ready for Integration
                </div>
              </div>

              <div>
                <button 
                  className="btn btn-primary"
                  onClick={() => viewModels(integration.id)}
                >
                  View Models
                </button>
                <button 
                  className="btn btn-success"
                  onClick={() => syncPlatform(integration.id)}
                >
                  Sync
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => testConnection(integration.id)}
                >
                  Test Connection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPlatform && platformModels.length > 0 && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 className="card-title">
            {getPlatformIcon(selectedPlatform.platform)} Models from {selectedPlatform.platform}
          </h3>
          <div className="card-content">
            <div className="model-grid">
              {platformModels.map((model) => (
                <div 
                  key={model.id} 
                  className="card"
                  style={{ 
                    marginBottom: 0,
                    borderLeft: `3px solid ${getPlatformColor(selectedPlatform.platform)}`
                  }}
                >
                  <h4 style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.5rem' }}>
                    {model.name}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Version: {model.version}
                  </p>
                  <button className="btn btn-primary" style={{ marginTop: '0.75rem', fontSize: '0.875rem', padding: '0.375rem 0.75rem' }}>
                    Select for Cosimulation
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">Integration Workflow</h3>
        <div className="card-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#ede9fe', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>1️⃣</div>
              <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>Connect Platforms</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Establish connections to MeDaC, EnviHub, and PlantHub
              </p>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: '#dbeafe', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>2️⃣</div>
              <h4 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>Detect Interfaces</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Automatically detect model interfaces from metadata
              </p>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: '#d1fae5', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>3️⃣</div>
              <h4 style={{ color: '#059669', marginBottom: '0.5rem' }}>Select Models</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Choose V-ECUs, Environment, and Plant models
              </p>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>4️⃣</div>
              <h4 style={{ color: '#d97706', marginBottom: '0.5rem' }}>Configure & Execute</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Set up middleware and execute test cases
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelIntegration;
