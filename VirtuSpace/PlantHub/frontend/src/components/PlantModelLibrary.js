import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

function PlantModelLibrary() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get(`${API_URL}/plant-models`);
      setModels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plant models:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-section">Loading plant models...</div>;
  }

  return (
    <div className="page-section">
      <h2>Plant Model Library</h2>
      <p>Browse and manage your plant simulation models.</p>
      
      <div className="models-grid">
        {models.map(model => (
          <div key={model.id} className="model-card">
            <h3>{model.name}</h3>
            <p>{model.description}</p>
            <div style={{ marginTop: '1rem' }}>
              <p><strong>Type:</strong> {model.type}</p>
              <p><strong>Version:</strong> {model.version}</p>
              <p><strong>Last Modified:</strong> {new Date(model.lastModified).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlantModelLibrary;
