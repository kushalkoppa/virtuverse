const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3023;

// V-Analyzer and V-DevContainers API URLs
const V_ANALYZER_API_URL = process.env.V_ANALYZER_API_URL || 'http://localhost:3020/api';
const V_DEVCONTAINERS_API_URL = process.env.V_DEVCONTAINERS_API_URL || 'http://localhost:3030/api';

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'VirtuSphere Backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Platform info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'VirtuSphere',
    description: 'Analytics and Visualization Platform',
    version: '1.0.0',
    components: [
      {
        name: 'V-Analyzer',
        description: 'Grafana-style dashboards for simulation data',
        apiUrl: '/api/v-analyzer'
      },
      {
        name: 'V-DevContainers',
        description: 'DevContainer generation tool',
        apiUrl: '/api/v-devcontainers'
      }
    ]
  });
});

// Aggregated stats endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const stats = {
      platform: 'VirtuSphere',
      timestamp: new Date().toISOString(),
      services: {
        'v-analyzer': { status: 'unknown' },
        'v-devcontainers': { status: 'unknown' }
      }
    };

    // Check V-Analyzer health
    try {
      const analyzerHealth = await axios.get(`${V_ANALYZER_API_URL}/health`, { timeout: 2000 });
      stats.services['v-analyzer'] = {
        status: 'healthy',
        response: analyzerHealth.data
      };
    } catch (error) {
      stats.services['v-analyzer'] = {
        status: 'unavailable',
        error: error.message
      };
    }

    // Check V-DevContainers health
    try {
      const devcontainersHealth = await axios.get(`${V_DEVCONTAINERS_API_URL}/health`, { timeout: 2000 });
      stats.services['v-devcontainers'] = {
        status: 'healthy',
        response: devcontainersHealth.data
      };
    } catch (error) {
      stats.services['v-devcontainers'] = {
        status: 'unavailable',
        error: error.message
      };
    }

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch platform stats' });
  }
});

// V-Analyzer proxy endpoints
app.use('/api/v-analyzer', async (req, res) => {
  try {
    const targetUrl = `${V_ANALYZER_API_URL}${req.path}`;
    console.log(`Proxying to V-Analyzer: ${targetUrl}`);
    
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      params: req.query,
      headers: {
        ...req.headers,
        host: new URL(V_ANALYZER_API_URL).host
      }
    });
    
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('V-Analyzer proxy error:', error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(503).json({ error: 'V-Analyzer service unavailable' });
    }
  }
});

// V-DevContainers proxy endpoints
app.use('/api/v-devcontainers', async (req, res) => {
  try {
    const targetUrl = `${V_DEVCONTAINERS_API_URL}${req.path}`;
    console.log(`Proxying to V-DevContainers: ${targetUrl}`);
    
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      params: req.query,
      headers: {
        ...req.headers,
        host: new URL(V_DEVCONTAINERS_API_URL).host
      }
    });
    
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('V-DevContainers proxy error:', error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(503).json({ error: 'V-DevContainers service unavailable' });
    }
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`VirtuSphere Backend running on port ${PORT}`);
  console.log(`V-Analyzer API URL: ${V_ANALYZER_API_URL}`);
  console.log(`V-DevContainers API URL: ${V_DEVCONTAINERS_API_URL}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
