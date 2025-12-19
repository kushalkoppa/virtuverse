import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SharingHub() {
  const [sharingRecords, setSharingRecords] = useState([]);
  const [internalAccess, setInternalAccess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewShareForm, setShowNewShareForm] = useState(false);
  const [newShare, setNewShare] = useState({
    modelId: '',
    sharedWith: '',
    type: 'oem',
    permissions: ['read'],
    expiryDate: ''
  });

  useEffect(() => {
    fetchSharingData();
  }, []);

  const fetchSharingData = async () => {
    try {
      const [sharingRes, internalRes] = await Promise.all([
        axios.get('http://localhost:3001/api/sharing'),
        axios.get('http://localhost:3001/api/sharing/internal')
      ]);
      setSharingRecords(sharingRes.data);
      setInternalAccess(internalRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sharing data:', error);
      // Fallback to mock data
      setSharingRecords([
        {
          id: 'share-001',
          modelId: 'model-001',
          sharedWith: 'OEM Partner A',
          type: 'oem',
          permissions: ['read', 'execute'],
          sharedDate: '2024-03-01',
          expiryDate: '2024-12-31',
          status: 'active'
        },
        {
          id: 'share-002',
          modelId: 'model-002',
          sharedWith: 'Tier1 Supplier B',
          type: 'supplier',
          permissions: ['read'],
          sharedDate: '2024-03-10',
          expiryDate: '2024-09-30',
          status: 'active'
        }
      ]);
      setInternalAccess([
        {
          modelId: 'model-001',
          domain: 'Chassis Systems',
          accessLevel: 'full',
          users: ['user1@bosch.com', 'user2@bosch.com']
        },
        {
          modelId: 'model-003',
          domain: 'eMobility',
          accessLevel: 'full',
          users: ['user3@bosch.com', 'user4@bosch.com']
        }
      ]);
      setLoading(false);
    }
  };

  const handleCreateShare = async () => {
    try {
      await axios.post('http://localhost:3001/api/sharing', newShare);
      setShowNewShareForm(false);
      fetchSharingData();
      alert('Sharing created successfully!');
    } catch (error) {
      console.error('Error creating share:', error);
    }
  };

  const handleRevokeShare = async (shareId) => {
    try {
      await axios.delete(`http://localhost:3001/api/sharing/${shareId}`);
      fetchSharingData();
    } catch (error) {
      console.error('Error revoking share:', error);
    }
  };

  if (loading) {
    return <div className="page-container">Loading sharing data...</div>;
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Sharing Hub</h2>
      <p className="page-description">
        Manage model sharing with external partners and internal domains
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          className="btn btn-primary"
          onClick={() => setShowNewShareForm(!showNewShareForm)}
        >
          {showNewShareForm ? 'Cancel' : 'Create New Share'}
        </button>
      </div>

      {showNewShareForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 className="card-title">New Sharing Record</h3>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Model ID
              </label>
              <input
                type="text"
                value={newShare.modelId}
                onChange={(e) => setNewShare({ ...newShare, modelId: e.target.value })}
                placeholder="e.g., model-001"
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Share With
                </label>
                <input
                  type="text"
                  value={newShare.sharedWith}
                  onChange={(e) => setNewShare({ ...newShare, sharedWith: e.target.value })}
                  placeholder="Partner name"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Type
                </label>
                <select
                  value={newShare.type}
                  onChange={(e) => setNewShare({ ...newShare, type: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                >
                  <option value="oem">OEM</option>
                  <option value="supplier">Supplier</option>
                  <option value="tool-vendor">Tool Vendor</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Expiry Date
              </label>
              <input
                type="date"
                value={newShare.expiryDate}
                onChange={(e) => setNewShare({ ...newShare, expiryDate: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>
            <button className="btn btn-success" onClick={handleCreateShare}>
              Create Share
            </button>
          </div>
        </div>
      )}

      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e3a8a' }}>
        External Sharing
      </h3>
      <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
        {sharingRecords.map(record => (
          <div key={record.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  {record.sharedWith}
                </h4>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Model: {record.modelId} | Type: {record.type}
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Permissions:</strong> {record.permissions.join(', ')}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  Shared: {record.sharedDate} | Expires: {record.expiryDate}
                </p>
              </div>
              <div>
                <span className={`badge ${record.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                  {record.status}
                </span>
                {record.status === 'active' && (
                  <button 
                    className="btn btn-secondary" 
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => handleRevokeShare(record.id)}
                  >
                    Revoke
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e3a8a' }}>
        Internal Access (Bosch Domains)
      </h3>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {internalAccess.map((access, index) => (
          <div key={index} className="card">
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              {access.domain}
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Model: {access.modelId} | Access Level: {access.accessLevel}
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>Users:</strong> {access.users.length} user(s)
            </p>
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              {access.users.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SharingHub;
