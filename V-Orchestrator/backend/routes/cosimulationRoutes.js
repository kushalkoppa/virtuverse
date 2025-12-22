const express = require('express');
const router = express.Router();

// In-memory storage for demo purposes
let cosimulationMiddlewares = [
  {
    id: 1,
    name: 'FMI Middleware',
    type: 'FMI/FMU',
    version: '2.0',
    status: 'active',
    description: 'Functional Mock-up Interface for model exchange and co-simulation',
    supportedModels: ['V-ECU', 'Environment', 'Plant'],
    capabilities: ['Model Exchange', 'Co-Simulation', 'Variable Step Size']
  },
  {
    id: 2,
    name: 'DCP Middleware',
    type: 'DCP',
    version: '1.0',
    status: 'active',
    description: 'Distributed Co-simulation Protocol for real-time simulation',
    supportedModels: ['V-ECU', 'Plant'],
    capabilities: ['Real-Time', 'Distributed', 'Network Communication']
  },
  {
    id: 3,
    name: 'Custom Integration',
    type: 'Custom',
    version: '1.0',
    status: 'inactive',
    description: 'Custom middleware for specific use-cases',
    supportedModels: ['V-ECU', 'Environment', 'Plant'],
    capabilities: ['Flexible', 'Extensible', 'Custom Protocols']
  }
];

// GET all cosimulation middlewares
router.get('/', (req, res) => {
  res.json(cosimulationMiddlewares);
});

// GET single middleware
router.get('/:id', (req, res) => {
  const middleware = cosimulationMiddlewares.find(m => m.id === parseInt(req.params.id));
  if (!middleware) {
    return res.status(404).json({ error: 'Middleware not found' });
  }
  res.json(middleware);
});

// POST new middleware
router.post('/', (req, res) => {
  const newMiddleware = {
    id: cosimulationMiddlewares.length + 1,
    ...req.body,
    status: req.body.status || 'inactive'
  };
  cosimulationMiddlewares.push(newMiddleware);
  res.status(201).json(newMiddleware);
});

// PUT update middleware
router.put('/:id', (req, res) => {
  const index = cosimulationMiddlewares.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Middleware not found' });
  }
  cosimulationMiddlewares[index] = { ...cosimulationMiddlewares[index], ...req.body };
  res.json(cosimulationMiddlewares[index]);
});

// DELETE middleware
router.delete('/:id', (req, res) => {
  const index = cosimulationMiddlewares.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Middleware not found' });
  }
  cosimulationMiddlewares.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
