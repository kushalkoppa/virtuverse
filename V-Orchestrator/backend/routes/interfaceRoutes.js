const express = require('express');
const router = express.Router();

// In-memory storage for demo purposes
let detectedInterfaces = [
  {
    id: 1,
    modelName: 'Engine_Controller_ECU',
    modelType: 'V-ECU',
    source: 'MeDaC',
    interfaces: [
      { name: 'ThrottlePosition', type: 'input', dataType: 'float64', unit: 'percentage', range: '0-100' },
      { name: 'EngineSpeed', type: 'output', dataType: 'float64', unit: 'RPM', range: '0-8000' },
      { name: 'FuelInjection', type: 'output', dataType: 'float64', unit: 'mg/stroke', range: '0-100' }
    ],
    detectedAt: new Date().toISOString(),
    status: 'detected'
  },
  {
    id: 2,
    modelName: 'Vehicle_Dynamics_Model',
    modelType: 'Environment',
    source: 'EnviHub',
    interfaces: [
      { name: 'VehicleSpeed', type: 'output', dataType: 'float64', unit: 'm/s', range: '0-100' },
      { name: 'SteeringAngle', type: 'input', dataType: 'float64', unit: 'degrees', range: '-45 to 45' },
      { name: 'BrakeForce', type: 'input', dataType: 'float64', unit: 'N', range: '0-5000' }
    ],
    detectedAt: new Date().toISOString(),
    status: 'detected'
  },
  {
    id: 3,
    modelName: 'Battery_Management_Plant',
    modelType: 'Plant',
    source: 'PlantHub',
    interfaces: [
      { name: 'BatteryVoltage', type: 'output', dataType: 'float64', unit: 'V', range: '300-450' },
      { name: 'Current', type: 'input', dataType: 'float64', unit: 'A', range: '-200 to 200' },
      { name: 'Temperature', type: 'output', dataType: 'float64', unit: 'Celsius', range: '-20 to 60' },
      { name: 'StateOfCharge', type: 'output', dataType: 'float64', unit: 'percentage', range: '0-100' }
    ],
    detectedAt: new Date().toISOString(),
    status: 'detected'
  }
];

// GET all detected interfaces
router.get('/', (req, res) => {
  res.json(detectedInterfaces);
});

// GET interfaces by model ID
router.get('/:id', (req, res) => {
  const interface_data = detectedInterfaces.find(i => i.id === parseInt(req.params.id));
  if (!interface_data) {
    return res.status(404).json({ error: 'Interface not found' });
  }
  res.json(interface_data);
});

// POST auto-detect interfaces from metadata
router.post('/detect', (req, res) => {
  const { modelName, modelType, source, metadata } = req.body;
  
  // Simulate interface detection from metadata
  const newInterface = {
    id: detectedInterfaces.length + 1,
    modelName,
    modelType,
    source,
    interfaces: metadata?.interfaces || [],
    detectedAt: new Date().toISOString(),
    status: 'detected'
  };
  
  detectedInterfaces.push(newInterface);
  res.status(201).json(newInterface);
});

// PUT update interface
router.put('/:id', (req, res) => {
  const index = detectedInterfaces.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Interface not found' });
  }
  detectedInterfaces[index] = { ...detectedInterfaces[index], ...req.body };
  res.json(detectedInterfaces[index]);
});

// GET interface compatibility check
router.post('/compatibility', (req, res) => {
  const { interface1Id, interface2Id } = req.body;
  
  const int1 = detectedInterfaces.find(i => i.id === interface1Id);
  const int2 = detectedInterfaces.find(i => i.id === interface2Id);
  
  if (!int1 || !int2) {
    return res.status(404).json({ error: 'One or both interfaces not found' });
  }
  
  // Simple compatibility check: match output to input
  const compatiblePairs = [];
  int1.interfaces.forEach(i1 => {
    int2.interfaces.forEach(i2 => {
      if (i1.type === 'output' && i2.type === 'input' && i1.dataType === i2.dataType) {
        compatiblePairs.push({ from: i1.name, to: i2.name });
      }
      if (i1.type === 'input' && i2.type === 'output' && i1.dataType === i2.dataType) {
        compatiblePairs.push({ from: i2.name, to: i1.name });
      }
    });
  });
  
  res.json({
    compatible: compatiblePairs.length > 0,
    pairs: compatiblePairs,
    models: [int1.modelName, int2.modelName]
  });
});

module.exports = router;
