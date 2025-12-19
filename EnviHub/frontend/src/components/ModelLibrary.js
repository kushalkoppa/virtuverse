import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModelLibrary() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ tool: '', type: '' });

  useEffect(() => {
    fetchModels();
  }, [filter]);

  const fetchModels = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.tool) params.append('tool', filter.tool);
      if (filter.type) params.append('type', filter.type);
      
      const response = await axios.get(`http://localhost:3001/api/models?${params}`);
      setModels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching models:', error);
      // Fallback to mock data
      setModels([
        {
          id: 'model-001',
          name: 'Sedan Vehicle Dynamics Model',
          type: 'vehicle-dynamics',
          tool: 'carmaker',
          version: '1.0',
          author: 'Bosch Engineering',
          created: '2024-01-15',
          modified: '2024-02-20',
          description: 'Complete vehicle dynamics model for mid-size sedan',
          tags: ['sedan', 'vehicle-dynamics', 'passenger-car']
        },
        {
          id: 'model-002',
          name: 'ADAS Camera Sensor Model',
          type: 'sensor',
          tool: 'prescan',
          version: '2.1',
          author: 'Bosch ADAS Team',
          created: '2024-02-10',
          modified: '2024-03-05',
          description: 'Front camera sensor model for ADAS applications',
          tags: ['adas', 'camera', 'sensor']
        },
        {
          id: 'model-003',
          name: 'Electric Powertrain Model',
          type: 'powertrain',
          tool: 'simulink',
          version: '1.5',
          author: 'Bosch eMobility',
          created: '2024-01-20',
          modified: '2024-03-15',
          description: 'Electric vehicle powertrain with battery management system',
          tags: ['ev', 'powertrain', 'battery']
        }
      ]);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-container">Loading models...</div>;
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Model Library</h2>
      <p className="page-description">
        Browse and manage simulation models across different tools
      </p>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <select 
          value={filter.tool} 
          onChange={(e) => setFilter({ ...filter, tool: e.target.value })}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
        >
          <option value="">All Tools</option>
          <option value="carmaker">IPG CarMaker</option>
          <option value="simulink">MATLAB Simulink</option>
          <option value="prescan">PreScan</option>
        </select>

        <select 
          value={filter.type} 
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
        >
          <option value="">All Types</option>
          <option value="vehicle-dynamics">Vehicle Dynamics</option>
          <option value="sensor">Sensor</option>
          <option value="powertrain">Powertrain</option>
        </select>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {models.map(model => (
          <div key={model.id} className="card">
            <h3 className="card-title">{model.name}</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
              v{model.version} | {model.tool} | {model.type}
            </p>
            <p style={{ marginBottom: '1rem' }}>{model.description}</p>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>Tags:</strong>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {model.tags.map(tag => (
                  <span key={tag} className="badge badge-info">{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
              <div>
                <span>Author: {model.author}</span>
                <span style={{ margin: '0 0.5rem' }}>|</span>
                <span>Modified: {model.modified}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary">View Details</button>
                <button className="btn btn-secondary">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelLibrary;
