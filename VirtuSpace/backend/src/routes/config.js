const express = require('express');
const router = express.Router();

// In-memory storage for configuration management (in production, use database)
let connections = [
  {
    id: 'jfrog',
    name: 'JFrog Artifactory',
    type: 'artifactory',
    url: 'https://artifactory.bosch.com',
    username: '',
    apiKey: '',
    repository: 'virtuverse-models',
    status: 'disconnected'
  },
  {
    id: 'github',
    name: 'GitHub Enterprise Server',
    type: 'github',
    url: 'https://boschdevcloud.com',
    username: '',
    token: '',
    organization: 'bosch',
    repository: 'virtuverse',
    status: 'disconnected'
  }
];

// Get all configuration connections
router.get('/', (req, res) => {
  try {
    // Don't send sensitive data like API keys
    const safeConnections = connections.map(conn => ({
      ...conn,
      apiKey: conn.apiKey ? '***' : '',
      token: conn.token ? '***' : ''
    }));
    res.json(safeConnections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific connection
router.get('/:id', (req, res) => {
  try {
    const connection = connections.find(c => c.id === req.params.id);
    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    
    // Don't send sensitive data
    const safeConnection = {
      ...connection,
      apiKey: connection.apiKey ? '***' : '',
      token: connection.token ? '***' : ''
    };
    res.json(safeConnection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update connection
router.put('/:id', (req, res) => {
  try {
    const index = connections.findIndex(c => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    
    connections[index] = {
      ...connections[index],
      ...req.body,
      id: req.params.id // Preserve ID
    };
    
    res.json({ message: 'Connection updated', connection: connections[index] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test connection
router.post('/:id/test', async (req, res) => {
  try {
    const connection = connections.find(c => c.id === req.params.id);
    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    
    // Simulate connection test
    // In production, actually test the connection to JFrog/GitHub
    const testSuccess = Math.random() > 0.2; // 80% success rate for demo
    
    if (testSuccess) {
      const index = connections.findIndex(c => c.id === req.params.id);
      connections[index].status = 'connected';
      res.json({ 
        success: true, 
        message: 'Connection successful',
        status: 'connected'
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'Connection failed. Please check credentials.',
        status: 'disconnected'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sync artifacts from JFrog
router.post('/:id/sync', async (req, res) => {
  try {
    const connection = connections.find(c => c.id === req.params.id);
    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    
    if (connection.status !== 'connected') {
      return res.status(400).json({ error: 'Connection not established. Please test connection first.' });
    }
    
    // Simulate syncing artifacts
    // In production, actually fetch from JFrog/GitHub API
    let data = [];
    
    if (connection.type === 'artifactory') {
      data = [
        { id: 1, name: 'environment-model-v1.2.0.fmu', size: '15.3 MB', date: '2024-12-20', type: 'fmu' },
        { id: 2, name: 'plant-model-sensor-v2.1.0.fmu', size: '8.7 MB', date: '2024-12-19', type: 'fmu' },
        { id: 3, name: 'v-ecu-brake-controller-v1.0.5.fmu', size: '22.1 MB', date: '2024-12-18', type: 'fmu' },
        { id: 4, name: 'environment-carmaker-v3.0.0.ipg', size: '45.2 MB', date: '2024-12-17', type: 'ipg' },
        { id: 5, name: 'plant-model-actuator-v1.5.2.slx', size: '12.8 MB', date: '2024-12-16', type: 'simulink' }
      ];
    } else if (connection.type === 'github') {
      data = [
        { id: 1, name: 'environment-models', stars: 45, lastUpdate: '2 hours ago', description: 'IPG CarMaker environment models' },
        { id: 2, name: 'plant-models', stars: 32, lastUpdate: '1 day ago', description: 'MATLAB Simulink plant models' },
        { id: 3, name: 'v-ecu-models', stars: 67, lastUpdate: '3 days ago', description: 'Virtual ECU models for cosimulation' },
        { id: 4, name: 'test-scenarios', stars: 23, lastUpdate: '5 days ago', description: 'Test cases and scenarios' },
        { id: 5, name: 'integration-scripts', stars: 18, lastUpdate: '1 week ago', description: 'Automation scripts for model integration' }
      ];
    }
    
    res.json({ 
      success: true, 
      message: 'Sync completed',
      data: data,
      count: data.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download artifact from JFrog
router.get('/:id/artifact/:artifactId', async (req, res) => {
  try {
    const connection = connections.find(c => c.id === req.params.id);
    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    
    if (connection.status !== 'connected') {
      return res.status(400).json({ error: 'Connection not established' });
    }
    
    // Simulate artifact download
    // In production, actually download from JFrog
    res.json({ 
      success: true, 
      message: 'Download initiated',
      artifactId: req.params.artifactId,
      downloadUrl: `${connection.url}/artifact/${req.params.artifactId}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clone repository from GitHub
router.post('/:id/clone/:repoName', async (req, res) => {
  try {
    const connection = connections.find(c => c.id === req.params.id);
    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    
    if (connection.status !== 'connected') {
      return res.status(400).json({ error: 'Connection not established' });
    }
    
    // Simulate repository clone
    // In production, actually clone from GitHub
    res.json({ 
      success: true, 
      message: 'Clone initiated',
      repoName: req.params.repoName,
      cloneUrl: `${connection.url}/${connection.organization}/${req.params.repoName}.git`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
