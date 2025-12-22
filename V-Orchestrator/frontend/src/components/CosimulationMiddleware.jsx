import React, { useState, useEffect } from 'react';
import { config } from '../config';

function CosimulationMiddleware() {
  const [middlewares, setMiddlewares] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'FMI/FMU',
    version: '',
    description: '',
    supportedModels: [],
    capabilities: []
  });

  useEffect(() => {
    fetchMiddlewares();
  }, []);

  const fetchMiddlewares = async () => {
    try {
      const response = await fetch(config.endpoints.cosimulation);
      if (response.ok) {
        const data = await response.json();
        setMiddlewares(data);
      }
    } catch (error) {
      console.error('Error fetching middlewares:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `${config.endpoints.cosimulation}/${editingId}`
        : config.endpoints.cosimulation;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchMiddlewares();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving middleware:', error);
    }
  };

  const handleEdit = (middleware) => {
    setFormData(middleware);
    setEditingId(middleware.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this middleware?')) {
      try {
        const response = await fetch(`${config.endpoints.cosimulation}/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchMiddlewares();
        }
      } catch (error) {
        console.error('Error deleting middleware:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'FMI/FMU',
      version: '',
      description: '',
      supportedModels: [],
      capabilities: []
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="page-title">Cosimulation Middleware</h2>
          <p className="page-description">
            Manage cosimulation middleware for integrating V-ECUs, Environment Models, and Plant Models
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Middleware'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 className="card-title">{editingId ? 'Edit Middleware' : 'Add New Middleware'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="FMI/FMU">FMI/FMU</option>
                <option value="DCP">DCP</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Version</label>
              <input
                type="text"
                className="form-input"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              {editingId ? 'Update' : 'Create'} Middleware
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="dashboard-grid">
        {middlewares.map((middleware) => (
          <div key={middleware.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <h3 className="card-title">{middleware.name}</h3>
              <div>
                <span className={`status-dot status-${middleware.status}`}></span>
                <span className={`badge badge-${middleware.status === 'active' ? 'success' : 'gray'}`}>
                  {middleware.status}
                </span>
              </div>
            </div>
            <div className="card-content">
              <p style={{ marginBottom: '0.5rem' }}><strong>Type:</strong> {middleware.type}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Version:</strong> {middleware.version}</p>
              <p style={{ marginBottom: '1rem' }}>{middleware.description}</p>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong>Supported Models:</strong>
                <div style={{ marginTop: '0.5rem' }}>
                  {middleware.supportedModels?.map((model, idx) => (
                    <span key={idx} className="badge badge-purple" style={{ marginRight: '0.5rem' }}>
                      {model}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong>Capabilities:</strong>
                <div style={{ marginTop: '0.5rem' }}>
                  {middleware.capabilities?.map((cap, idx) => (
                    <span key={idx} className="badge badge-info" style={{ marginRight: '0.5rem', marginTop: '0.25rem' }}>
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <button className="btn btn-primary" onClick={() => handleEdit(middleware)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(middleware.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {middlewares.length === 0 && !showForm && (
        <div className="alert alert-info">
          No middleware configured. Click "Add Middleware" to create one.
        </div>
      )}
    </div>
  );
}

export default CosimulationMiddleware;
