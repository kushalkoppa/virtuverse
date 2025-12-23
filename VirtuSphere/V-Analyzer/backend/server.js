const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3020;

// Middleware
app.use(cors());
app.use(express.json());

// Mock dashboard data
const dashboards = [
  {
    id: 1,
    name: 'Simulation Results Dashboard',
    type: 'simulation',
    description: 'Visualization of open-loop and closed-loop simulation results',
    panels: 4,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Platform Health Dashboard',
    type: 'health',
    description: 'Real-time platform health and service availability metrics',
    panels: 6,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Usage Analytics Dashboard',
    type: 'usage',
    description: 'User activity and feature usage statistics',
    panels: 5,
    lastUpdated: new Date().toISOString()
  }
];

// Mock metrics data
const generateMetrics = () => ({
  simulations: {
    total: 156,
    today: 23,
    running: 3,
    success_rate: 94.5
  },
  platform: {
    uptime: 99.8,
    response_time: 245,
    active_users: 48,
    error_rate: 0.02
  },
  usage: {
    envihub_requests: 1247,
    planthub_requests: 892,
    orchestrator_runs: 156,
    analyzer_views: 342
  }
});

// Get all dashboards
app.get('/api/dashboards', (req, res) => {
  res.json(dashboards);
});

// Get dashboard by ID
app.get('/api/dashboards/:id', (req, res) => {
  const dashboard = dashboards.find(d => d.id === parseInt(req.params.id));
  if (!dashboard) {
    return res.status(404).json({ error: 'Dashboard not found' });
  }
  res.json(dashboard);
});

// Get metrics
app.get('/api/metrics', (req, res) => {
  res.json(generateMetrics());
});

// Get time-series data (mock)
app.get('/api/timeseries/:metric', (req, res) => {
  const { metric } = req.params;
  const hours = 24;
  const data = [];
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(Date.now() - i * 60 * 60 * 1000);
    let value;
    
    switch (metric) {
      case 'simulations':
        value = Math.floor(Math.random() * 10) + 5;
        break;
      case 'response_time':
        value = Math.floor(Math.random() * 100) + 200;
        break;
      case 'active_users':
        value = Math.floor(Math.random() * 30) + 20;
        break;
      default:
        value = Math.random() * 100;
    }
    
    data.push({ timestamp, value });
  }
  
  res.json(data);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'V-Analyzer API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`V-Analyzer server running on port ${PORT}`);
});

module.exports = app;
