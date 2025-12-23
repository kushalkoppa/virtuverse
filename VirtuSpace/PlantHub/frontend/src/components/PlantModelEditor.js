import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

function PlantModelEditor() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Plant Simulation',
    version: '1.0.0'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/plant-models`, formData);
      setMessage('Plant model created successfully!');
      setFormData({
        name: '',
        description: '',
        type: 'Plant Simulation',
        version: '1.0.0'
      });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error creating plant model:', error);
      setMessage('Error creating plant model');
    }
  };

  return (
    <div className="page-section">
      <h2>Plant Model Editor</h2>
      <p>Create and configure new plant simulation models.</p>
      
      <form className="editor-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Model Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Tool Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="Plant Simulation">Plant Simulation</option>
            <option value="Process Simulator">Process Simulator</option>
            <option value="Factory Planner">Factory Planner</option>
            <option value="Production Optimizer">Production Optimizer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="version">Version</label>
          <input
            type="text"
            id="version"
            name="version"
            value={formData.version}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Plant Model</button>
        {message && <p style={{ marginTop: '1rem', color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
      </form>
    </div>
  );
}

export default PlantModelEditor;
