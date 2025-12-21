const express = require('express');
const router = express.Router();

// In-memory plant model library (in production, this would be a database)
let models = [
  {
    id: 'model-001',
    name: 'Temperature Sensor Model',
    type: 'sensor',
    tool: 'simulink',
    version: '1.0',
    author: 'Bosch Plant Modeling Team',
    created: '2024-01-15',
    modified: '2024-02-20',
    description: 'High-precision temperature sensor model with noise characteristics',
    tags: ['sensor', 'temperature', 'measurement'],
    parameters: {
      range: '-40 to 150°C',
      accuracy: '±0.5°C',
      responseTime: '1s'
    },
    access: 'internal'
  },
  {
    id: 'model-002',
    name: 'Electric Motor Actuator',
    type: 'actuator',
    tool: 'modelica',
    version: '2.1',
    author: 'Bosch Actuator Team',
    created: '2024-02-10',
    modified: '2024-03-05',
    description: 'Brushless DC motor actuator model for automotive applications',
    tags: ['actuator', 'motor', 'electric'],
    parameters: {
      voltage: '12V',
      maxTorque: '50Nm',
      efficiency: '92%'
    },
    access: 'internal'
  },
  {
    id: 'model-003',
    name: 'Hydraulic System Model',
    type: 'physical',
    tool: 'amesim',
    version: '1.5',
    author: 'Bosch Systems Team',
    created: '2024-01-20',
    modified: '2024-03-15',
    description: 'Complete hydraulic system physical model for brake systems',
    tags: ['hydraulic', 'physical', 'brake-system'],
    parameters: {
      maxPressure: '200bar',
      fluidType: 'DOT4',
      volume: '500ml'
    },
    access: 'internal'
  },
  {
    id: 'model-004',
    name: 'PID Controller Mathematical Model',
    type: 'mathematical',
    tool: 'simulink',
    version: '3.0',
    author: 'Bosch Control Systems',
    created: '2024-02-01',
    modified: '2024-03-20',
    description: 'Mathematical PID controller model for plant control applications',
    tags: ['mathematical', 'controller', 'pid'],
    parameters: {
      kp: 1.2,
      ki: 0.5,
      kd: 0.1
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
