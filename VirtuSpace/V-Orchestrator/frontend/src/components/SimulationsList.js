import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

function SimulationsList() {
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSimulations();
  }, []);

  const fetchSimulations = async () => {
    try {
      const response = await axios.get(`${API_URL}/simulations`);
      setSimulations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching simulations:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-section">Loading simulations...</div>;
  }

  return (
    <div className="page-section">
      <h2>All Simulations</h2>
      
      <div className="simulations-grid">
        {simulations.map(sim => (
          <div key={sim.id} className="simulation-card">
            <h3>{sim.name}</h3>
            <div style={{ marginBottom: '1rem' }}>
              <span className={`badge ${sim.status}`}>{sim.status}</span>
              <span className={`badge ${sim.type}`}>{sim.type}</span>
            </div>
            <p><strong>Platform:</strong> {sim.platform}</p>
            <p><strong>Created:</strong> {new Date(sim.created_at).toLocaleString()}</p>
            {sim.duration && <p><strong>Duration:</strong> {sim.duration}s</p>}
            {sim.progress && <p><strong>Progress:</strong> {sim.progress}%</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimulationsList;
