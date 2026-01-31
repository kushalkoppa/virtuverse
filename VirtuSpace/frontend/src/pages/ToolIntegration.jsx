import { useState } from 'react';
import { Settings, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/ToolIntegration.css';

function ToolIntegration() {
  const location = useLocation();
  const isMeDaC = location.pathname.startsWith('/medac');
  
  const getMeDaCIntegrations = () => [
    {
      id: 1,
      name: 'Synopsys Virtualizer',
      status: 'connected',
      version: '2024.03',
      lastSync: '2024-12-19 10:30',
      endpoint: 'http://localhost:8090',
      description: 'Virtual prototyping platform for creating fast, accurate Virtual ECUs'
    },
    {
      id: 2,
      name: 'Vector CANoe',
      status: 'connected',
      version: '18.0',
      lastSync: '2024-12-19 09:15',
      endpoint: 'http://localhost:9100',
      description: 'Development and testing tool for ECU networks and individual ECUs'
    },
    {
      id: 3,
      name: 'dSPACE VEOS',
      status: 'connected',
      version: '5.2',
      lastSync: '2024-12-19 08:45',
      endpoint: 'http://localhost:7070',
      description: 'PC-based simulation platform for virtual validation of ECU software'
    },
    {
      id: 4,
      name: 'ETAS LABCAR',
      status: 'disconnected',
      version: '10.1',
      lastSync: '2024-12-18 16:45',
      endpoint: 'http://localhost:8200',
      description: 'Real-time simulation and testing system for Virtual ECU integration'
    },
    {
      id: 5,
      name: 'MeDaC Tool',
      status: 'disconnected',
      version: '1.0',
      lastSync: 'Never',
      endpoint: 'TO_BE_CONFIGURED',
      description: 'MetaData Configurator backend tool for Virtual ECU management (URL to be configured)'
    }
  ];

  const getDefaultIntegrations = () => [
    {
      id: 1,
      name: 'IPG CarMaker',
      status: 'connected',
      version: '12.0',
      lastSync: '2024-12-19 10:30',
      endpoint: 'http://localhost:8080',
      description: 'Industry-leading virtual test driving simulation'
    },
    {
      id: 2,
      name: 'MATLAB/Simulink',
      status: 'connected',
      version: 'R2024a',
      lastSync: '2024-12-19 09:15',
      endpoint: 'http://localhost:9090',
      description: 'Model-based design and simulation environment'
    },
    {
      id: 3,
      name: 'dSPACE VEOS',
      status: 'disconnected',
      version: '5.2',
      lastSync: '2024-12-18 16:45',
      endpoint: 'http://localhost:7070',
      description: 'PC-based simulation platform'
    }
  ];

  const [integrations, setIntegrations] = useState(
    isMeDaC ? getMeDaCIntegrations() : getDefaultIntegrations()
  );

  const handleTestConnection = (id) => {
    // Simulate testing connection
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, status: 'testing' }
        : integration
    ));

    setTimeout(() => {
      setIntegrations(prev => prev.map(integration => 
        integration.id === id 
          ? { ...integration, status: 'connected', lastSync: new Date().toLocaleString('en-US', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          : integration
      ));
    }, 2000);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'connected':
        return <CheckCircle size={20} className="status-icon connected" />;
      case 'disconnected':
        return <AlertCircle size={20} className="status-icon disconnected" />;
      case 'testing':
        return <RefreshCw size={20} className="status-icon testing spin" />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Tool Integration</h2>
        <p>Manage connections to simulation tools and external platforms</p>
      </div>

      <div className="integration-list">
        {integrations.map(integration => (
          <div key={integration.id} className="integration-card">
            <div className="integration-header">
              <div className="integration-title">
                <Settings size={24} className="tool-icon" />
                <div>
                  <h3>{integration.name}</h3>
                  <p className="integration-description">{integration.description}</p>
                </div>
              </div>
              <div className="integration-status">
                {getStatusIcon(integration.status)}
                <span className={`status-text ${integration.status}`}>
                  {integration.status}
                </span>
              </div>
            </div>

            <div className="integration-details">
              <div className="detail-row">
                <span className="detail-label">Version:</span>
                <span className="detail-value">{integration.version}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Endpoint:</span>
                <span className="detail-value">{integration.endpoint}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Sync:</span>
                <span className="detail-value">{integration.lastSync}</span>
              </div>
            </div>

            <div className="integration-actions">
              <button 
                className="btn-test"
                onClick={() => handleTestConnection(integration.id)}
                disabled={integration.status === 'testing'}
              >
                {integration.status === 'testing' ? 'Testing...' : 'Test Connection'}
              </button>
              <button className="btn-configure">Configure</button>
              <button className="btn-sync">Sync Models</button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-integration-section">
        <h3>Add New Integration</h3>
        <form className="integration-form">
          <div className="form-row">
            <div className="form-group">
              <label>Tool Name</label>
              <input type="text" placeholder="e.g., Custom Simulation Tool" />
            </div>
            <div className="form-group">
              <label>Endpoint URL</label>
              <input type="text" placeholder="http://localhost:port" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>API Key (optional)</label>
              <input type="password" placeholder="Enter API key if required" />
            </div>
            <div className="form-group">
              <label>Version</label>
              <input type="text" placeholder="e.g., v1.0" />
            </div>
          </div>
          <button type="submit" className="btn-add-integration">
            Add Integration
          </button>
        </form>
      </div>
    </div>
  );
}

export default ToolIntegration;
