const express = require('express');
const router = express.Router();

// Plant modeling tool interfaces
const tools = [
  {
    id: 'simulink',
    name: 'MATLAB Simulink',
    version: '2023b',
    type: 'plant-modeling',
    status: 'active',
    description: 'Block diagram environment for modeling physical and mathematical plant models',
    capabilities: ['physical-modeling', 'mathematical-modeling', 'control-systems', 'signal-processing'],
    connectionStatus: 'connected'
  },
  {
    id: 'modelica',
    name: 'Modelica',
    version: '4.0',
    type: 'physical-modeling',
    status: 'active',
    description: 'Multi-domain physical system modeling language for complex plant systems',
    capabilities: ['physical-modeling', 'multi-domain', 'acausal-modeling'],
    connectionStatus: 'connected'
  },
  {
    id: 'amesim',
    name: 'Simcenter Amesim',
    version: '2023.1',
    type: 'physical-modeling',
    status: 'active',
    description: 'Multi-domain system simulation for plant modeling including hydraulics, pneumatics, and thermal systems',
    capabilities: ['hydraulic-systems', 'pneumatic-systems', 'thermal-systems', 'mechanical-systems'],
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
