import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

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
      
      const response = await axios.get(`${API_BASE_URL}/models?${params}`);
      setModels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching models:', error);
      // Fallback to mock data
      setModels([
        {
          id: 'model-001',
          name: 'Temperature Sensor Model',
          type: 'sensor',
          tool: 'simulink',
          version: '1.0',
          author: 'Bosch Plant Modeling Team',
          created: '2024-01-15',
          modified: '2024-02-20',
          description: 'High-precision temperature sensor model with noise characteristics',
          tags: ['sensor', 'temperature', 'measurement']
        },
        {
          id: 'model-002',
          name: 'Electric Motor Actuator',
          type: 'actuator',
          tool: 'modelica',
          version: '2.1',
          author: 'Bosch Actuator Team',
          created: '2024-02-10',
          modified: '2024-03-05',
          description: 'Brushless DC motor actuator model for automotive applications',
          tags: ['actuator', 'motor', 'electric']
        },
        {
          id: 'model-003',
          name: 'Hydraulic System Model',
          type: 'physical',
          tool: 'amesim',
          version: '1.5',
          author: 'Bosch Systems Team',
          created: '2024-01-20',
          modified: '2024-03-15',
          description: 'Complete hydraulic system physical model for brake systems',
          tags: ['hydraulic', 'physical', 'brake-system']
        },
        {
          id: 'model-004',
          name: 'PID Controller Mathematical Model',
          type: 'mathematical',
          tool: 'simulink',
          version: '3.0',
          author: 'Bosch Control Systems',
          created: '2024-02-01',
          modified: '2024-03-20',
          description: 'Mathematical PID controller model for plant control applications',
          tags: ['mathematical', 'controller', 'pid']
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
        Browse and manage plant models: sensors, actuators, physical and mathematical models
      </p>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <select 
          value={filter.tool} 
          onChange={(e) => setFilter({ ...filter, tool: e.target.value })}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
        >
          <option value="">All Tools</option>
          <option value="simulink">MATLAB Simulink</option>
          <option value="modelica">Modelica</option>
          <option value="amesim">Simcenter Amesim</option>
        </select>

        <select 
          value={filter.type} 
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
        >
          <option value="">All Types</option>
          <option value="sensor">Sensor</option>
          <option value="actuator">Actuator</option>
          <option value="physical">Physical</option>
          <option value="mathematical">Mathematical</option>
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
