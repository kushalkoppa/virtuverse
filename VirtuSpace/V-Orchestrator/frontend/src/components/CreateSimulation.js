import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';

function CreateSimulation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: 'open-loop',
    platform: 'EnviHub',
    description: ''
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
      await axios.post(`${API_URL}/simulations`, formData);
      setMessage('Simulation created successfully!');
      setTimeout(() => navigate('/simulations'), 1500);
    } catch (error) {
      console.error('Error creating simulation:', error);
      setMessage('Error creating simulation');
    }
  };

  return (
    <div className="page-section">
      <h2>Create New Simulation</h2>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Simulation Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Simulation Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            <option value="open-loop">Open-Loop</option>
            <option value="closed-loop">Closed-Loop</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Target Platform
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            <option value="EnviHub">EnviHub</option>
            <option value="PlantHub">PlantHub</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        <button type="submit">Create Simulation</button>
        {message && (
          <p style={{ 
            marginTop: '1rem', 
            color: message.includes('success') ? '#065f46' : '#991b1b' 
          }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default CreateSimulation;
