const express = require('express');
const router = express.Router();

// Mock plant tools data
const plantTools = [
  {
    id: 1,
    name: 'Plant Simulation',
    description: 'Advanced plant and manufacturing simulation tool',
    status: 'active',
    icon: '🏭'
  },
  {
    id: 2,
    name: 'Process Simulator',
    description: 'Manufacturing process simulation and optimization',
    status: 'active',
    icon: '⚙️'
  },
  {
    id: 3,
    name: 'Factory Planner',
    description: 'Factory layout and workflow planning tool',
    status: 'active',
    icon: '🏗️'
  },
  {
    id: 4,
    name: 'Production Optimizer',
    description: 'Optimize production lines and efficiency',
    status: 'active',
    icon: '📊'
  }
];

// GET all plant tools
router.get('/', (req, res) => {
  res.json(plantTools);
});

// GET a specific plant tool by ID
router.get('/:id', (req, res) => {
  const tool = plantTools.find(t => t.id === parseInt(req.params.id));
  if (!tool) {
    return res.status(404).json({ error: 'Plant tool not found' });
  }
  res.json(tool);
});

module.exports = router;
