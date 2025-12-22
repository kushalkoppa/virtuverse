const express = require('express');
const router = express.Router();

// In-memory storage for demo purposes
let integrations = [
  {
    id: 1,
    platform: 'MeDaC',
    type: 'V-ECU',
    status: 'connected',
    url: 'http://localhost:3000',
    modelsAvailable: 5,
    lastSync: new Date().toISOString(),
    models: [
      { id: 'ecu_1', name: 'Engine_Controller_ECU', version: '1.0' },
      { id: 'ecu_2', name: 'Brake_Controller_ECU', version: '2.1' },
      { id: 'ecu_3', name: 'Battery_Management_ECU', version: '1.5' },
      { id: 'ecu_4', name: 'ADAS_Controller_ECU', version: '3.0' },
      { id: 'ecu_5', name: 'Transmission_Controller_ECU', version: '1.2' }
    ]
  },
  {
    id: 2,
    platform: 'EnviHub',
    type: 'Environment',
    status: 'connected',
    url: 'http://localhost:3001',
    modelsAvailable: 4,
    lastSync: new Date().toISOString(),
    models: [
      { id: 'env_1', name: 'Vehicle_Dynamics_Model', version: '2.0' },
      { id: 'env_2', name: 'Road_Environment_Model', version: '1.0' },
      { id: 'env_3', name: 'Weather_Simulation_Model', version: '1.3' },
      { id: 'env_4', name: 'Traffic_Scenario_Model', version: '2.5' }
    ]
  },
  {
    id: 3,
    platform: 'PlantHub',
    type: 'Plant',
    status: 'connected',
    url: 'http://localhost:3002',
    modelsAvailable: 6,
    lastSync: new Date().toISOString(),
    models: [
      { id: 'plant_1', name: 'Battery_Management_Plant', version: '1.0' },
      { id: 'plant_2', name: 'Electric_Motor_Plant', version: '2.0' },
      { id: 'plant_3', name: 'Thermal_Management_Plant', version: '1.1' },
      { id: 'plant_4', name: 'Suspension_System_Plant', version: '1.0' },
      { id: 'plant_5', name: 'Brake_System_Plant', version: '1.5' },
      { id: 'plant_6', name: 'Steering_System_Plant', version: '1.3' }
    ]
  }
];

// GET all platform integrations
router.get('/', (req, res) => {
  res.json(integrations);
});

// GET single integration
router.get('/:id', (req, res) => {
  const integration = integrations.find(i => i.id === parseInt(req.params.id));
  if (!integration) {
    return res.status(404).json({ error: 'Integration not found' });
  }
  res.json(integration);
});

// POST sync models from platform
router.post('/:id/sync', (req, res) => {
  const integration = integrations.find(i => i.id === parseInt(req.params.id));
  if (!integration) {
    return res.status(404).json({ error: 'Integration not found' });
  }
  
  // Simulate sync
  integration.lastSync = new Date().toISOString();
  
  res.json({
    success: true,
    platform: integration.platform,
    modelsSynced: integration.modelsAvailable,
    lastSync: integration.lastSync
  });
});

// GET models from specific platform
router.get('/:id/models', (req, res) => {
  const integration = integrations.find(i => i.id === parseInt(req.params.id));
  if (!integration) {
    return res.status(404).json({ error: 'Integration not found' });
  }
  res.json(integration.models);
});

// POST test connection to platform
router.post('/:id/test', (req, res) => {
  const integration = integrations.find(i => i.id === parseInt(req.params.id));
  if (!integration) {
    return res.status(404).json({ error: 'Integration not found' });
  }
  
  // Simulate connection test
  res.json({
    success: true,
    platform: integration.platform,
    status: integration.status,
    latency: Math.floor(Math.random() * 50) + 10,
    message: `Successfully connected to ${integration.platform}`
  });
});

// PUT update integration
router.put('/:id', (req, res) => {
  const index = integrations.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Integration not found' });
  }
  integrations[index] = { ...integrations[index], ...req.body };
  res.json(integrations[index]);
});

// GET integration statistics
router.get('/stats/summary', (req, res) => {
  const stats = {
    totalPlatforms: integrations.length,
    connectedPlatforms: integrations.filter(i => i.status === 'connected').length,
    totalModels: integrations.reduce((sum, i) => sum + i.modelsAvailable, 0),
    byType: {
      'V-ECU': integrations.filter(i => i.type === 'V-ECU').reduce((sum, i) => sum + i.modelsAvailable, 0),
      'Environment': integrations.filter(i => i.type === 'Environment').reduce((sum, i) => sum + i.modelsAvailable, 0),
      'Plant': integrations.filter(i => i.type === 'Plant').reduce((sum, i) => sum + i.modelsAvailable, 0)
    }
  };
  res.json(stats);
});

module.exports = router;
