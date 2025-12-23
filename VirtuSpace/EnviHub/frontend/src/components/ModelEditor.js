import React, { useState } from 'react';

function ModelEditor() {
  const [modelData, setModelData] = useState({
    name: '',
    type: 'vehicle-dynamics',
    tool: 'carmaker',
    version: '1.0',
    description: '',
    tags: '',
    parameters: {}
  });

  const [selectedModel, setSelectedModel] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModelData({ ...modelData, [name]: value });
  };

  const handleSave = () => {
    console.log('Saving model:', modelData);
    alert('Model saved successfully!');
  };

  const loadExistingModel = () => {
    // Mock loading an existing model
    setSelectedModel('model-001');
    setModelData({
      name: 'Sedan Vehicle Dynamics Model',
      type: 'vehicle-dynamics',
      tool: 'carmaker',
      version: '1.0',
      description: 'Complete vehicle dynamics model for mid-size sedan',
      tags: 'sedan, vehicle-dynamics, passenger-car',
      parameters: {
        mass: 1500,
        wheelbase: 2.7,
        track: 1.6
      }
    });
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Model Editor</h2>
      <p className="page-description">
        Create new models or edit existing simulation models
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <button className="btn btn-primary" onClick={loadExistingModel}>
          Load Existing Model
        </button>
        <button className="btn btn-secondary" style={{ marginLeft: '1rem' }} onClick={() => setModelData({
          name: '',
          type: 'vehicle-dynamics',
          tool: 'carmaker',
          version: '1.0',
          description: '',
          tags: '',
          parameters: {}
        })}>
          New Model
        </button>
      </div>

      <div className="card">
        <h3 className="card-title">Model Information</h3>
        
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Model Name
            </label>
            <input
              type="text"
              name="name"
              value={modelData.name}
              onChange={handleInputChange}
              placeholder="Enter model name"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Tool
              </label>
              <select
                name="tool"
                value={modelData.tool}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
              >
                <option value="carmaker">IPG CarMaker</option>
                <option value="simulink">MATLAB Simulink</option>
                <option value="prescan">PreScan</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Type
              </label>
              <select
                name="type"
                value={modelData.type}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
              >
                <option value="vehicle-dynamics">Vehicle Dynamics</option>
                <option value="sensor">Sensor</option>
                <option value="powertrain">Powertrain</option>
                <option value="control-system">Control System</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Version
              </label>
              <input
                type="text"
                name="version"
                value={modelData.version}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Description
            </label>
            <textarea
              name="description"
              value={modelData.description}
              onChange={handleInputChange}
              placeholder="Enter model description"
              rows="4"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={modelData.tags}
              onChange={handleInputChange}
              placeholder="e.g., sedan, vehicle-dynamics, passenger-car"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 className="card-title">Model Parameters</h3>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
          Configure tool-specific parameters for this model
        </p>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
          <code>
            {JSON.stringify(modelData.parameters, null, 2) || '{\n  // Add parameters here\n}'}
          </code>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button className="btn btn-success" onClick={handleSave}>
          Save Model
        </button>
        <button className="btn btn-secondary">
          Validate
        </button>
        <button className="btn btn-secondary">
          Preview
        </button>
      </div>
    </div>
  );
}

export default ModelEditor;
