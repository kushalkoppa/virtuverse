const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Mock simulations data
let simulations = [
  {
    id: 1,
    name: 'Open-Loop Test Scenario',
    type: 'open-loop',
    status: 'completed',
    platform: 'EnviHub',
    created_at: new Date().toISOString(),
    duration: 120,
    results_url: '/results/1'
  },
  {
    id: 2,
    name: 'Closed-Loop Plant Simulation',
    type: 'closed-loop',
    status: 'running',
    platform: 'PlantHub',
    created_at: new Date().toISOString(),
    progress: 65
  }
];

// Get all simulations
app.get('/api/simulations', (req, res) => {
  res.json(simulations);
});

// Get simulation by ID
app.get('/api/simulations/:id', (req, res) => {
  const simulation = simulations.find(s => s.id === parseInt(req.params.id));
  if (!simulation) {
    return res.status(404).json({ error: 'Simulation not found' });
  }
  res.json(simulation);
});

// Create new simulation
app.post('/api/simulations', (req, res) => {
  const newSimulation = {
    id: simulations.length + 1,
    ...req.body,
    status: 'queued',
    created_at: new Date().toISOString()
  };
  simulations.push(newSimulation);
  res.status(201).json(newSimulation);
});

// Update simulation status
app.put('/api/simulations/:id', (req, res) => {
  const index = simulations.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Simulation not found' });
  }
  simulations[index] = { ...simulations[index], ...req.body };
  res.json(simulations[index]);
});

// Delete simulation
app.delete('/api/simulations/:id', (req, res) => {
  const index = simulations.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Simulation not found' });
  }
  simulations.splice(index, 1);
  res.status(204).send();
});

// Mock models data for orchestrator
const modelsData = {
  medac: [
    { id: 'medac-1', name: 'Sensor Data Model', type: 'model', metadata: { inputs: ['raw_data'], outputs: ['processed_data'] } },
    { id: 'medac-2', name: 'Camera Data Processor', type: 'model', metadata: { inputs: ['camera_feed'], outputs: ['image_data'] } },
    { id: 'medac-3', name: 'LIDAR Data Handler', type: 'model', metadata: { inputs: ['lidar_points'], outputs: ['point_cloud'] } },
    { id: 'medac-4', name: 'Radar Data Parser', type: 'data', metadata: { format: 'csv', size: '1.2GB' } },
  ],
  envihub: [
    { id: 'envihub-1', name: 'Weather Model', type: 'model', metadata: { inputs: ['time', 'location'], outputs: ['temperature', 'humidity'] } },
    { id: 'envihub-2', name: 'Road Surface Model', type: 'model', metadata: { inputs: ['road_type'], outputs: ['friction', 'roughness'] } },
    { id: 'envihub-3', name: 'Traffic Scenario', type: 'data', metadata: { format: 'json', vehicles: 50 } },
    { id: 'envihub-4', name: 'Terrain Model', type: 'model', metadata: { inputs: ['coordinates'], outputs: ['elevation', 'slope'] } },
  ],
  planthub: [
    { id: 'planthub-1', name: 'Powertrain Model', type: 'model', metadata: { inputs: ['throttle', 'rpm'], outputs: ['torque', 'power'] } },
    { id: 'planthub-2', name: 'Battery Thermal Model', type: 'model', metadata: { inputs: ['current', 'ambient_temp'], outputs: ['cell_temp', 'soc'] } },
    { id: 'planthub-3', name: 'Vehicle Dynamics', type: 'model', metadata: { inputs: ['steering', 'throttle', 'brake'], outputs: ['velocity', 'position'] } },
    { id: 'planthub-4', name: 'Brake System Model', type: 'model', metadata: { inputs: ['brake_pressure'], outputs: ['deceleration'] } },
  ],
  vehicledata: [
    { id: 'vehicle-1', name: 'Vehicle Config A', type: 'data', metadata: { format: 'json', vehicle_type: 'sedan' } },
    { id: 'vehicle-2', name: 'Vehicle Config B', type: 'data', metadata: { format: 'json', vehicle_type: 'suv' } },
    { id: 'vehicle-3', name: 'CAN Bus Data', type: 'data', metadata: { format: 'dbc', signals: 200 } },
    { id: 'vehicle-4', name: 'Calibration Data', type: 'data', metadata: { format: 'a2l', parameters: 500 } },
  ],
  middleware: [
    { id: 'mw-1', name: 'FMI/FMU Interface', type: 'middleware', metadata: { protocol: 'FMI 2.0', compatible: ['Simulink', 'VEOS'] } },
    { id: 'mw-2', name: 'DCP Bridge', type: 'middleware', metadata: { protocol: 'DCP 1.0', compatible: ['SILVER', 'CANoe'] } },
    { id: 'mw-3', name: 'SSP Connector', type: 'middleware', metadata: { protocol: 'SSP 1.0', compatible: ['all'] } },
  ],
  platforms: [
    { id: 'platform-1', name: 'dSPACE VEOS', type: 'platform', metadata: { vendor: 'dSPACE', supports: ['FMI', 'Simulink'] } },
    { id: 'platform-2', name: 'Synopsys SILVER', type: 'platform', metadata: { vendor: 'Synopsys', supports: ['DCP', 'FMI'] } },
    { id: 'platform-3', name: 'Vector CANoe', type: 'platform', metadata: { vendor: 'Vector', supports: ['CAN', 'DCP'] } },
    { id: 'platform-4', name: 'IPG CarMaker', type: 'platform', metadata: { vendor: 'IPG', supports: ['FMI', 'Custom'] } },
    { id: 'platform-5', name: 'MATLAB/Simulink', type: 'platform', metadata: { vendor: 'MathWorks', supports: ['FMI', 'SFunction'] } },
  ]
};

// Get models by category
app.get('/api/models/:category', (req, res) => {
  const category = req.params.category;
  if (modelsData[category]) {
    res.json(modelsData[category]);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// Get all models
app.get('/api/models', (req, res) => {
  res.json(modelsData);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'V-Orchestrator API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`V-Orchestrator server running on port ${PORT}`);
});

module.exports = app;
