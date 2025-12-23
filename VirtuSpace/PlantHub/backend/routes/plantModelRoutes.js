const express = require('express');
const router = express.Router();

// Mock plant models data
let plantModels = [
  {
    id: 1,
    name: 'Assembly Line Model',
    description: 'Complete assembly line simulation model',
    type: 'Plant Simulation',
    version: '1.0.0',
    lastModified: new Date().toISOString(),
    status: 'active'
  },
  {
    id: 2,
    name: 'Manufacturing Process',
    description: 'End-to-end manufacturing process model',
    type: 'Process Simulator',
    version: '2.1.0',
    lastModified: new Date().toISOString(),
    status: 'active'
  }
];

// GET all plant models
router.get('/', (req, res) => {
  res.json(plantModels);
});

// GET a specific plant model by ID
router.get('/:id', (req, res) => {
  const model = plantModels.find(m => m.id === parseInt(req.params.id));
  if (!model) {
    return res.status(404).json({ error: 'Plant model not found' });
  }
  res.json(model);
});

// POST create a new plant model
router.post('/', (req, res) => {
  const newModel = {
    id: plantModels.length + 1,
    ...req.body,
    lastModified: new Date().toISOString(),
    status: 'active'
  };
  plantModels.push(newModel);
  res.status(201).json(newModel);
});

// PUT update a plant model
router.put('/:id', (req, res) => {
  const modelIndex = plantModels.findIndex(m => m.id === parseInt(req.params.id));
  if (modelIndex === -1) {
    return res.status(404).json({ error: 'Plant model not found' });
  }
  plantModels[modelIndex] = {
    ...plantModels[modelIndex],
    ...req.body,
    lastModified: new Date().toISOString()
  };
  res.json(plantModels[modelIndex]);
});

// DELETE a plant model
router.delete('/:id', (req, res) => {
  const modelIndex = plantModels.findIndex(m => m.id === parseInt(req.params.id));
  if (modelIndex === -1) {
    return res.status(404).json({ error: 'Plant model not found' });
  }
  plantModels.splice(modelIndex, 1);
  res.status(204).send();
});

module.exports = router;
