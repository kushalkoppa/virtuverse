import React, { useState, useEffect } from 'react';
import { config } from '../config';

function InterfaceDetection() {
  const [interfaces, setInterfaces] = useState([]);
  const [selectedInterface, setSelectedInterface] = useState(null);
  const [compatibilityCheck, setCompatibilityCheck] = useState(null);

  useEffect(() => {
    fetchInterfaces();
  }, []);

  const fetchInterfaces = async () => {
    try {
      const response = await fetch(config.endpoints.interfaces);
      if (response.ok) {
        const data = await response.json();
        setInterfaces(data);
      }
    } catch (error) {
      console.error('Error fetching interfaces:', error);
    }
  };

  const checkCompatibility = async (id1, id2) => {
    try {
      const response = await fetch(`${config.endpoints.interfaces}/compatibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interface1Id: id1, interface2Id: id2 })
      });
      if (response.ok) {
        const data = await response.json();
        setCompatibilityCheck(data);
      }
    } catch (error) {
      console.error('Error checking compatibility:', error);
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'MeDaC': return '#8b5cf6';
      case 'EnviHub': return '#2563eb';
      case 'PlantHub': return '#059669';
      default: return '#6b7280';
    }
  };

  const getSourceBadge = (source) => {
    switch (source) {
      case 'MeDaC': return 'badge-purple';
      case 'EnviHub': return 'badge-info';
      case 'PlantHub': return 'badge-success';
      default: return 'badge-gray';
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Interface Detection</h2>
      <p className="page-description">
        Automatically detected model interfaces from metadata provided by MeDaC, EnviHub, and PlantHub
      </p>

      <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
        <strong>Intelligent Detection:</strong> V-Orchestrator automatically analyzes metadata from all connected platforms 
        to identify model interfaces, data types, units, and compatibility for seamless integration.
      </div>

      <div className="dashboard-grid">
        {interfaces.map((interfaceData) => (
          <div key={interfaceData.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h3 className="card-title">{interfaceData.modelName}</h3>
              <span className={`badge ${getSourceBadge(interfaceData.source)}`}>
                {interfaceData.source}
              </span>
            </div>
            
            <div className="card-content">
              <div style={{ marginBottom: '1rem' }}>
                <p><strong>Model Type:</strong> {interfaceData.modelType}</p>
                <p><strong>Detected:</strong> {new Date(interfaceData.detectedAt).toLocaleString()}</p>
                <p><strong>Status:</strong> <span className="badge badge-success">{interfaceData.status}</span></p>
              </div>

              <div className="interface-list">
                <strong>Interfaces ({interfaceData.interfaces.length}):</strong>
                {interfaceData.interfaces.map((iface, idx) => (
                  <div key={idx} className="interface-item">
                    <div>
                      <div className="interface-name">{iface.name}</div>
                      <div className="interface-type">
                        {iface.type} • {iface.dataType} • {iface.unit}
                      </div>
                      <div className="interface-type">
                        Range: {iface.range}
                      </div>
                    </div>
                    <span className={`badge ${iface.type === 'input' ? 'badge-info' : 'badge-warning'}`}>
                      {iface.type}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1rem' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedInterface(interfaceData)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {interfaces.length === 0 && (
        <div className="alert alert-warning">
          No interfaces detected yet. Connect to MeDaC, EnviHub, or PlantHub to detect model interfaces.
        </div>
      )}

      {selectedInterface && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 className="card-title">Interface Details: {selectedInterface.modelName}</h3>
          <div className="card-content">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Interface Name</th>
                    <th>Type</th>
                    <th>Data Type</th>
                    <th>Unit</th>
                    <th>Range</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInterface.interfaces.map((iface, idx) => (
                    <tr key={idx}>
                      <td><strong>{iface.name}</strong></td>
                      <td>
                        <span className={`badge ${iface.type === 'input' ? 'badge-info' : 'badge-warning'}`}>
                          {iface.type}
                        </span>
                      </td>
                      <td>{iface.dataType}</td>
                      <td>{iface.unit}</td>
                      <td>{iface.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">Compatibility Checker</h3>
        <div className="card-content">
          <p style={{ marginBottom: '1rem' }}>
            Check compatibility between two model interfaces to identify matching input/output pairs
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div className="form-group">
              <label className="form-label">Model 1</label>
              <select className="form-select" id="model1">
                <option value="">Select model...</option>
                {interfaces.map((iface) => (
                  <option key={iface.id} value={iface.id}>
                    {iface.modelName} ({iface.source})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Model 2</label>
              <select className="form-select" id="model2">
                <option value="">Select model...</option>
                {interfaces.map((iface) => (
                  <option key={iface.id} value={iface.id}>
                    {iface.modelName} ({iface.source})
                  </option>
                ))}
              </select>
            </div>
            <button 
              className="btn btn-success"
              onClick={() => {
                const m1 = document.getElementById('model1').value;
                const m2 = document.getElementById('model2').value;
                if (m1 && m2) checkCompatibility(parseInt(m1), parseInt(m2));
              }}
            >
              Check Compatibility
            </button>
          </div>

          {compatibilityCheck && (
            <div style={{ marginTop: '1rem' }}>
              <div className={`alert ${compatibilityCheck.compatible ? 'alert-success' : 'alert-warning'}`}>
                <strong>
                  {compatibilityCheck.compatible 
                    ? '✓ Models are compatible!' 
                    : '⚠ No compatible interfaces found'}
                </strong>
                {compatibilityCheck.compatible && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <p>Found {compatibilityCheck.pairs.length} compatible connection(s):</p>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                      {compatibilityCheck.pairs.map((pair, idx) => (
                        <li key={idx}>{pair.from} → {pair.to}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InterfaceDetection;
