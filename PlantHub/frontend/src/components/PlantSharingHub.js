import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

function PlantSharingHub() {
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    modelId: '',
    sharedWith: '',
    permission: 'read'
  });

  useEffect(() => {
    fetchShares();
  }, []);

  const fetchShares = async () => {
    try {
      const response = await axios.get(`${API_URL}/plant-sharing`);
      setShares(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plant shares:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/plant-sharing`, formData);
      fetchShares();
      setFormData({
        modelId: '',
        sharedWith: '',
        permission: 'read'
      });
    } catch (error) {
      console.error('Error creating plant share:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/plant-sharing/${id}`);
      fetchShares();
    } catch (error) {
      console.error('Error deleting plant share:', error);
    }
  };

  if (loading) {
    return <div className="page-section">Loading plant shares...</div>;
  }

  return (
    <div className="page-section">
      <h2>Plant Sharing Hub</h2>
      <p>Share plant models with partners and manage access permissions.</p>
      
      <form className="editor-form" onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div className="form-group">
          <label htmlFor="modelId">Model ID</label>
          <input
            type="number"
            id="modelId"
            name="modelId"
            value={formData.modelId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sharedWith">Share with (Email)</label>
          <input
            type="email"
            id="sharedWith"
            name="sharedWith"
            value={formData.sharedWith}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="permission">Permission</label>
          <select
            id="permission"
            name="permission"
            value={formData.permission}
            onChange={handleChange}
            required
          >
            <option value="read">Read</option>
            <option value="write">Write</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Share Plant Model</button>
      </form>

      <h3>Active Shares</h3>
      <ul className="sharing-list">
        {shares.map(share => (
          <li key={share.id} className="sharing-item">
            <div className="info">
              <p><strong>Model ID:</strong> {share.modelId}</p>
              <p><strong>Shared with:</strong> {share.sharedWith}</p>
              <p><strong>Permission:</strong> {share.permission}</p>
              <p><strong>Shared on:</strong> {new Date(share.sharedDate).toLocaleDateString()}</p>
            </div>
            <button onClick={() => handleDelete(share.id)}>Revoke</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlantSharingHub;
