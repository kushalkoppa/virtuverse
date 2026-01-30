const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authMiddleware } = require('../middleware/auth');

// Get integration status for all services
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const services = {
      virtuspace: process.env.VIRTUSPACE_URL || 'http://localhost:3003',
      virtusphere_analyzer: process.env.VIRTUSPHERE_ANALYZER_URL || 'http://localhost:3020',
      virtusphere_devcontainers: process.env.VIRTUSPHERE_DEVCONTAINERS_URL || 'http://localhost:3030'
    };

    const statusChecks = await Promise.allSettled([
      axios.get(`${services.virtuspace}/api/health`, { timeout: 5000 }),
      axios.get(`${services.virtusphere_analyzer}/api/health`, { timeout: 5000 }),
      axios.get(`${services.virtusphere_devcontainers}/api/health`, { timeout: 5000 })
    ]);

    res.json({
      virtuspace: {
        url: services.virtuspace,
        status: statusChecks[0].status === 'fulfilled' ? 'healthy' : 'unavailable',
        details: statusChecks[0].status === 'fulfilled' ? statusChecks[0].value.data : null
      },
      virtusphere: {
        analyzer: {
          url: services.virtusphere_analyzer,
          status: statusChecks[1].status === 'fulfilled' ? 'healthy' : 'unavailable',
          details: statusChecks[1].status === 'fulfilled' ? statusChecks[1].value.data : null
        },
        devcontainers: {
          url: services.virtusphere_devcontainers,
          status: statusChecks[2].status === 'fulfilled' ? 'healthy' : 'unavailable',
          details: statusChecks[2].status === 'fulfilled' ? statusChecks[2].value.data : null
        }
      },
      overall: statusChecks.some(s => s.status === 'fulfilled') ? 'partial' : 'unavailable'
    });
  } catch (error) {
    console.error('Error checking integration status:', error);
    res.status(500).json({ error: 'Failed to check integration status' });
  }
});

// Proxy request to VirtuSpace
router.all('/virtuspace/*', authMiddleware, async (req, res) => {
  try {
    const virtuSpaceUrl = process.env.VIRTUSPACE_URL || 'http://localhost:3003';
    const path = req.params[0];
    
    const response = await axios({
      method: req.method,
      url: `${virtuSpaceUrl}/api/${path}`,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': req.user.id,
        'X-User-Email': req.user.email
      },
      timeout: 30000
    });

    res.json(response.data);
  } catch (error) {
    console.error('VirtuSpace proxy error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'VirtuSpace request failed',
      message: error.message 
    });
  }
});

// Proxy request to VirtuSphere Analyzer
router.all('/virtusphere/analyzer/*', authMiddleware, async (req, res) => {
  try {
    const analyzerUrl = process.env.VIRTUSPHERE_ANALYZER_URL || 'http://localhost:3020';
    const path = req.params[0];
    
    const response = await axios({
      method: req.method,
      url: `${analyzerUrl}/api/${path}`,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': req.user.id,
        'X-User-Email': req.user.email
      },
      timeout: 30000
    });

    res.json(response.data);
  } catch (error) {
    console.error('VirtuSphere Analyzer proxy error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'VirtuSphere Analyzer request failed',
      message: error.message 
    });
  }
});

// Proxy request to VirtuSphere DevContainers
router.all('/virtusphere/devcontainers/*', authMiddleware, async (req, res) => {
  try {
    const devcontainersUrl = process.env.VIRTUSPHERE_DEVCONTAINERS_URL || 'http://localhost:3030';
    const path = req.params[0];
    
    const response = await axios({
      method: req.method,
      url: `${devcontainersUrl}/api/${path}`,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': req.user.id,
        'X-User-Email': req.user.email
      },
      timeout: 30000
    });

    res.json(response.data);
  } catch (error) {
    console.error('VirtuSphere DevContainers proxy error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'VirtuSphere DevContainers request failed',
      message: error.message 
    });
  }
});

// Get aggregated metrics from all services
router.get('/metrics', authMiddleware, async (req, res) => {
  try {
    const services = {
      virtuspace: process.env.VIRTUSPACE_URL || 'http://localhost:3003',
      analyzer: process.env.VIRTUSPHERE_ANALYZER_URL || 'http://localhost:3020'
    };

    const metricsChecks = await Promise.allSettled([
      axios.get(`${services.virtuspace}/api/stats`, { timeout: 5000 }),
      axios.get(`${services.analyzer}/api/metrics`, { timeout: 5000 })
    ]);

    res.json({
      virtuspace: metricsChecks[0].status === 'fulfilled' ? metricsChecks[0].value.data : null,
      analyzer: metricsChecks[1].status === 'fulfilled' ? metricsChecks[1].value.data : null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

module.exports = router;
