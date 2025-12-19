import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ToolsInterface() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tools');
      setTools(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tools:', error);
      // Fallback to mock data
      setTools([
        {
          id: 'carmaker',
          name: 'IPG CarMaker',
          version: '12.0',
          type: 'vehicle-dynamics',
          status: 'active',
          description: 'Virtual test driving for chassis and vehicle dynamics simulation',
          capabilities: ['vehicle-dynamics', 'adas', 'autonomous-driving'],
          connectionStatus: 'connected'
        },
        {
          id: 'simulink',
          name: 'MATLAB Simulink',
          version: '2023b',
          type: 'model-based-design',
          status: 'active',
          description: 'Block diagram environment for model-based design',
          capabilities: ['control-systems', 'signal-processing', 'embedded-systems'],
          connectionStatus: 'connected'
        },
        {
          id: 'prescan',
          name: 'PreScan',
          version: '2023.1',
          type: 'sensor-simulation',
          status: 'active',
          description: 'Physics-based simulation of sensors like cameras, radar, lidar, and ultrasound',
          capabilities: ['sensor-simulation', 'adas', 'scenario-testing'],
          connectionStatus: 'available'
        }
      ]);
      setLoading(false);
    }
  };

  const handleConnect = async (toolId) => {
    try {
      await axios.post(`http://localhost:3001/api/tools/${toolId}/connect`);
      fetchTools();
    } catch (error) {
      console.error('Error connecting to tool:', error);
    }
  };

  const handleDisconnect = async (toolId) => {
    try {
      await axios.post(`http://localhost:3001/api/tools/${toolId}/disconnect`);
      fetchTools();
    } catch (error) {
      console.error('Error disconnecting from tool:', error);
    }
  };

  if (loading) {
    return <div className="page-container">Loading tools...</div>;
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Tool Interfaces</h2>
      <p className="page-description">
        Connect and manage interfaces to various simulation tools
      </p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {tools.map(tool => (
          <div key={tool.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 className="card-title">{tool.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Version {tool.version} | {tool.type}
                </p>
                <p style={{ marginBottom: '1rem' }}>{tool.description}</p>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Capabilities:</strong>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {tool.capabilities.map(cap => (
                      <span key={cap} className="badge badge-info">{cap}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span>
                    Status: 
                    <span className={`badge ${tool.connectionStatus === 'connected' ? 'badge-success' : 'badge-warning'}`} style={{ marginLeft: '0.5rem' }}>
                      {tool.connectionStatus}
                    </span>
                  </span>
                  
                  {tool.connectionStatus === 'connected' ? (
                    <button className="btn btn-secondary" onClick={() => handleDisconnect(tool.id)}>
                      Disconnect
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleConnect(tool.id)}>
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToolsInterface;
