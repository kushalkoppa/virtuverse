import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

function PlantToolsInterface() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get(`${API_URL}/plant-tools`);
      setTools(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plant tools:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-section">Loading plant tools...</div>;
  }

  return (
    <div className="page-section">
      <h2>Plant Tool Interfaces</h2>
      <p>Connect to and manage plant simulation and manufacturing tools.</p>
      
      <div className="tools-grid">
        {tools.map(tool => (
          <div key={tool.id} className="tool-card">
            <div className="icon">{tool.icon}</div>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <span className={`status-badge ${tool.status}`}>{tool.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlantToolsInterface;
