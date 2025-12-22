import { useState, useEffect } from 'react';
import { Github, Database, CheckCircle, XCircle, RefreshCw, Settings } from 'lucide-react';
import '../ConfigManagement.css';

function ConfigManagement() {
  const [connections, setConnections] = useState([
    {
      id: 'jfrog',
      name: 'JFrog Artifactory',
      type: 'artifactory',
      icon: Database,
      url: 'https://artifactory.bosch.com',
      username: '',
      apiKey: '',
      repository: 'virtuverse-models',
      status: 'disconnected',
      color: '#41bf5d'
    },
    {
      id: 'github',
      name: 'GitHub Enterprise Server',
      type: 'github',
      icon: Github,
      url: 'https://boschdevcloud.com',
      username: '',
      token: '',
      organization: 'bosch',
      repository: 'virtuverse',
      status: 'disconnected',
      color: '#6e5494'
    }
  ]);

  const [selectedConnection, setSelectedConnection] = useState(null);
  const [testingConnection, setTestingConnection] = useState(null);
  const [artifacts, setArtifacts] = useState([]);
  const [repositories, setRepositories] = useState([]);

  const handleConnectionUpdate = (id, field, value) => {
    setConnections(connections.map(conn => 
      conn.id === id ? { ...conn, [field]: value } : conn
    ));
  };

  const testConnection = async (id) => {
    setTestingConnection(id);
    
    // Simulate connection test
    setTimeout(() => {
      setConnections(connections.map(conn => 
        conn.id === id ? { ...conn, status: 'connected' } : conn
      ));
      setTestingConnection(null);
    }, 1500);
  };

  const syncArtifacts = (connectionId) => {
    // Simulate syncing artifacts from JFrog
    if (connectionId === 'jfrog') {
      setArtifacts([
        { id: 1, name: 'environment-model-v1.2.0.fmu', size: '15.3 MB', date: '2024-12-20' },
        { id: 2, name: 'plant-model-sensor-v2.1.0.fmu', size: '8.7 MB', date: '2024-12-19' },
        { id: 3, name: 'v-ecu-brake-controller-v1.0.5.fmu', size: '22.1 MB', date: '2024-12-18' }
      ]);
    } else if (connectionId === 'github') {
      setRepositories([
        { id: 1, name: 'environment-models', stars: 45, lastUpdate: '2 hours ago' },
        { id: 2, name: 'plant-models', stars: 32, lastUpdate: '1 day ago' },
        { id: 3, name: 'v-ecu-models', stars: 67, lastUpdate: '3 days ago' }
      ]);
    }
  };

  return (
    <div className="config-management-container">
      <div className="config-header">
        <h2>Configuration Management</h2>
        <p>Manage connections to JFrog Artifactory and GitHub Enterprise Server for model versioning and source control</p>
      </div>

      {/* Connection Cards */}
      <div className="connections-grid">
        {connections.map((conn) => {
          const Icon = conn.icon;
          const isSelected = selectedConnection === conn.id;
          const isTesting = testingConnection === conn.id;
          
          return (
            <div 
              key={conn.id} 
              className={`connection-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedConnection(conn.id)}
            >
              <div className="connection-header">
                <div className="connection-icon" style={{ background: conn.color }}>
                  <Icon size={24} />
                </div>
                <div className="connection-info">
                  <h3>{conn.name}</h3>
                  <div className="connection-status">
                    {conn.status === 'connected' ? (
                      <>
                        <CheckCircle size={16} className="status-icon connected" />
                        <span className="status-text connected">Connected</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="status-icon disconnected" />
                        <span className="status-text disconnected">Disconnected</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="connection-details">
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      value={conn.url}
                      onChange={(e) => handleConnectionUpdate(conn.id, 'url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      value={conn.username}
                      onChange={(e) => handleConnectionUpdate(conn.id, 'username', e.target.value)}
                      placeholder="Enter username"
                    />
                  </div>

                  <div className="form-group">
                    <label>{conn.type === 'jfrog' ? 'API Key' : 'Personal Access Token'}</label>
                    <input
                      type="password"
                      value={conn.type === 'jfrog' ? conn.apiKey : conn.token}
                      onChange={(e) => handleConnectionUpdate(
                        conn.id, 
                        conn.type === 'jfrog' ? 'apiKey' : 'token', 
                        e.target.value
                      )}
                      placeholder="Enter credentials"
                    />
                  </div>

                  {conn.type === 'jfrog' && (
                    <div className="form-group">
                      <label>Repository</label>
                      <input
                        type="text"
                        value={conn.repository}
                        onChange={(e) => handleConnectionUpdate(conn.id, 'repository', e.target.value)}
                        placeholder="Repository name"
                      />
                    </div>
                  )}

                  {conn.type === 'github' && (
                    <>
                      <div className="form-group">
                        <label>Organization</label>
                        <input
                          type="text"
                          value={conn.organization}
                          onChange={(e) => handleConnectionUpdate(conn.id, 'organization', e.target.value)}
                          placeholder="Organization name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Repository</label>
                        <input
                          type="text"
                          value={conn.repository}
                          onChange={(e) => handleConnectionUpdate(conn.id, 'repository', e.target.value)}
                          placeholder="Repository name"
                        />
                      </div>
                    </>
                  )}

                  <div className="connection-actions">
                    <button 
                      className="test-btn"
                      onClick={() => testConnection(conn.id)}
                      disabled={isTesting}
                    >
                      {isTesting ? (
                        <>
                          <RefreshCw size={16} className="spinning" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Settings size={16} />
                          Test Connection
                        </>
                      )}
                    </button>
                    <button 
                      className="sync-btn"
                      onClick={() => syncArtifacts(conn.id)}
                      disabled={conn.status !== 'connected'}
                    >
                      <RefreshCw size={16} />
                      Sync Models
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Artifacts Section */}
      {artifacts.length > 0 && (
        <div className="artifacts-section">
          <h3>Available Artifacts from JFrog</h3>
          <div className="artifacts-list">
            {artifacts.map(artifact => (
              <div key={artifact.id} className="artifact-item">
                <Database size={20} />
                <div className="artifact-info">
                  <span className="artifact-name">{artifact.name}</span>
                  <span className="artifact-meta">{artifact.size} • {artifact.date}</span>
                </div>
                <button className="download-btn">Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Repositories Section */}
      {repositories.length > 0 && (
        <div className="repositories-section">
          <h3>GitHub Repositories</h3>
          <div className="repositories-list">
            {repositories.map(repo => (
              <div key={repo.id} className="repository-item">
                <Github size={20} />
                <div className="repository-info">
                  <span className="repository-name">{repo.name}</span>
                  <span className="repository-meta">⭐ {repo.stars} • Updated {repo.lastUpdate}</span>
                </div>
                <button className="clone-btn">Clone</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfigManagement;
