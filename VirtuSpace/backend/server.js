const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Proxy routes to EnviHub
app.use('/api/envihub', async (req, res) => {
  try {
    const url = `${process.env.ENVIHUB_API_URL || 'http://localhost:3001/api'}${req.url}`;
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: req.headers
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Proxy routes to PlantHub
app.use('/api/planthub', async (req, res) => {
  try {
    const url = `${process.env.PLANTHUB_API_URL || 'http://localhost:3002/api'}${req.url}`;
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: req.headers
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'VirtuSpace API' });
});

// Aggregated stats endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const enviHubHealth = await axios.get(`${process.env.ENVIHUB_API_URL || 'http://localhost:3001/api'}/health`);
    const plantHubHealth = await axios.get(`${process.env.PLANTHUB_API_URL || 'http://localhost:3002/api'}/health`);
    
    res.json({
      enviHub: enviHubHealth.data,
      plantHub: plantHubHealth.data,
      overall: 'healthy'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`VirtuSpace server running on port ${PORT}`);
});

module.exports = app;
