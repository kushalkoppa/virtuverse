const express = require('express');
const router = express.Router();

// In-memory model library (in production, this would be a database)
let models = [
  {
    id: 'model-001',
    name: 'Sedan Vehicle Dynamics Model',
    type: 'vehicle-dynamics',
    tool: 'carmaker',
    version: '1.0',
    author: 'Bosch Engineering',
    created: '2024-01-15',
    modified: '2024-02-20',
    description: 'Complete vehicle dynamics model for mid-size sedan',
    tags: ['sedan', 'vehicle-dynamics', 'passenger-car'],
    parameters: {
      mass: 1500,
      wheelbase: 2.7,
      track: 1.6
    },
    access: 'internal'
  },
  {
    id: 'model-002',
    name: 'ADAS Camera Sensor Model',
    type: 'sensor',
    tool: 'prescan',
    version: '2.1',
    author: 'Bosch ADAS Team',
    created: '2024-02-10',
    modified: '2024-03-05',
    description: 'Front camera sensor model for ADAS applications',
    tags: ['adas', 'camera', 'sensor'],
    parameters: {
      resolution: '1920x1080',
      fov: 60,
      range: 100
    },
    access: 'internal'
  },
  {
    id: 'model-003',
    name: 'Electric Powertrain Model',
    type: 'powertrain',
    tool: 'simulink',
    version: '1.5',
    author: 'Bosch eMobility',
    created: '2024-01-20',
    modified: '2024-03-15',
    description: 'Electric vehicle powertrain with battery management system',
    tags: ['ev', 'powertrain', 'battery'],
    parameters: {
      batteryCapacity: 75,
      motorPower: 150,
      voltage: 400
    },
    access: 'internal'
  }
];

// GET all models
router.get('/', (req, res) => {
  const { tool, type, tag } = req.query;
  let filteredModels = models;

  if (tool) {
    filteredModels = filteredModels.filter(m => m.tool === tool);
  }
  if (type) {
    filteredModels = filteredModels.filter(m => m.type === type);
  }
  if (tag) {
    filteredModels = filteredModels.filter(m => m.tags.includes(tag));
  }

  res.json(filteredModels);
});

// GET specific model by ID
router.get('/:id', (req, res) => {
  const model = models.find(m => m.id === req.params.id);
  if (model) {
    res.json(model);
  } else {
    res.status(404).json({ error: 'Model not found' });
  }
});

// POST - Create new model
router.post('/', (req, res) => {
  const newModel = {
    id: `model-${String(models.length + 1).padStart(3, '0')}`,
    ...req.body,
    created: new Date().toISOString().split('T')[0],
    modified: new Date().toISOString().split('T')[0]
  };
  models.push(newModel);
  res.status(201).json(newModel);
});

// PUT - Update model
router.put('/:id', (req, res) => {
  const index = models.findIndex(m => m.id === req.params.id);
  if (index !== -1) {
    models[index] = {
      ...models[index],
      ...req.body,
      modified: new Date().toISOString().split('T')[0]
    };
    res.json(models[index]);
  } else {
    res.status(404).json({ error: 'Model not found' });
  }
});

// DELETE - Delete model
router.delete('/:id', (req, res) => {
  const index = models.findIndex(m => m.id === req.params.id);
  if (index !== -1) {
    const deleted = models.splice(index, 1);
    res.json({ message: 'Model deleted', model: deleted[0] });
  } else {
    res.status(404).json({ error: 'Model not found' });
  }
});

module.exports = router;
