const express = require('express');
const router = express.Router();

// Tool interface data - IPG CarMaker and other tools
const tools = [
  {
    id: 'carmaker',
    name: 'IPG CarMaker',
    version: '12.0',
    type: 'vehicle-dynamics',
    status: 'active',
    description: 'Virtual test driving for chassis and vehicle dynamics simulation',
    capabilities: ['vehicle-dynamics', 'adas', 'autonomous-driving'],
    connectionStatus: 'connected'
  },
  {
    id: 'simulink',
    name: 'MATLAB Simulink',
    version: '2023b',
    type: 'model-based-design',
    status: 'active',
    description: 'Block diagram environment for model-based design',
    capabilities: ['control-systems', 'signal-processing', 'embedded-systems'],
    connectionStatus: 'connected'
  },
  {
    id: 'prescan',
    name: 'PreScan',
    version: '2023.1',
    type: 'sensor-simulation',
    status: 'active',
    description: 'Physics-based simulation of sensors like cameras, radar, lidar, and ultrasound',
    capabilities: ['sensor-simulation', 'adas', 'scenario-testing'],
    connectionStatus: 'available'
  }
];

// GET all tools
router.get('/', (req, res) => {
  res.json(tools);
});

// GET specific tool by ID
router.get('/:id', (req, res) => {
  const tool = tools.find(t => t.id === req.params.id);
  if (tool) {
    res.json(tool);
  } else {
    res.status(404).json({ error: 'Tool not found' });
  }
});

// POST - Connect to a tool
router.post('/:id/connect', (req, res) => {
  const tool = tools.find(t => t.id === req.params.id);
  if (tool) {
    tool.connectionStatus = 'connected';
    res.json({ message: `Connected to ${tool.name}`, tool });
  } else {
    res.status(404).json({ error: 'Tool not found' });
  }
});

// POST - Disconnect from a tool
router.post('/:id/disconnect', (req, res) => {
  const tool = tools.find(t => t.id === req.params.id);
  if (tool) {
    tool.connectionStatus = 'disconnected';
    res.json({ message: `Disconnected from ${tool.name}`, tool });
  } else {
    res.status(404).json({ error: 'Tool not found' });
  }
});

module.exports = router;
