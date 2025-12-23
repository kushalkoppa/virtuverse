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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'V-Orchestrator API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`V-Orchestrator server running on port ${PORT}`);
});

module.exports = app;
