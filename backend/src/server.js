const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Import routes
const modelRoutes = require('./routes/models');
const toolRoutes = require('./routes/tools');
const metadataRoutes = require('./routes/metadata');
const configRoutes = require('./routes/config');
const aiAgentRoutes = require('./routes/aiagent');

// Use routes
app.use('/api/models', modelRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/metadata', metadataRoutes);
app.use('/api/config', configRoutes);
app.use('/api/aiagent', aiAgentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VirtuSpace API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'VirtuSpace Backend API',
    version: '1.0.0',
    endpoints: {
      models: '/api/models',
      tools: '/api/tools',
      metadata: '/api/metadata',
      config: '/api/config',
      aiagent: '/api/aiagent',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Initialize database
const db = require('./config/database');
db.initialize();

// Start server
app.listen(PORT, () => {
  console.log(`VirtuSpace Backend Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

module.exports = app;
