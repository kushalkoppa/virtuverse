import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function ToolsInterface() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tools`);
      setTools(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tools:', error);
      // Fallback to mock data
      setTools([
        {
          id: 'simulink',
          name: 'MATLAB Simulink',
          version: '2023b',
          type: 'plant-modeling',
          status: 'active',
          description: 'Block diagram environment for modeling physical and mathematical plant models',
          capabilities: ['physical-modeling', 'mathematical-modeling', 'control-systems', 'signal-processing'],
          connectionStatus: 'connected'
        },
        {
          id: 'modelica',
          name: 'Modelica',
          version: '4.0',
          type: 'physical-modeling',
          status: 'active',
          description: 'Multi-domain physical system modeling language for complex plant systems',
          capabilities: ['physical-modeling', 'multi-domain', 'acausal-modeling'],
          connectionStatus: 'connected'
        },
        {
          id: 'amesim',
          name: 'Simcenter Amesim',
          version: '2023.1',
          type: 'physical-modeling',
          status: 'active',
          description: 'Multi-domain system simulation for plant modeling including hydraulics, pneumatics, and thermal systems',
          capabilities: ['hydraulic-systems', 'pneumatic-systems', 'thermal-systems', 'mechanical-systems'],
          connectionStatus: 'available'
        }
      ]);
      setLoading(false);
    }
  };

  const handleConnect = async (toolId) => {
    try {
      await axios.post(`${API_BASE_URL}/tools/${toolId}/connect`);
      fetchTools();
    } catch (error) {
      console.error('Error connecting to tool:', error);
    }
  };

  const handleDisconnect = async (toolId) => {
    try {
      await axios.post(`${API_BASE_URL}/tools/${toolId}/disconnect`);
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
        Connect and manage interfaces to various plant modeling tools
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
