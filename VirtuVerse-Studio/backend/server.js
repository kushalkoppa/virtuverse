const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const vmRoutes = require('./routes/vm');
const postgresRoutes = require('./routes/postgres');
const jfrogRoutes = require('./routes/jfrog');
const githubRoutes = require('./routes/github');
const azureaiRoutes = require('./routes/azureai');
const { authMiddleware } = require('./middleware/auth');

// Load environment variables
dotenv.config();

// Initialize database
require('./config/database');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vm', vmRoutes);
app.use('/api/postgres', postgresRoutes);
app.use('/api/jfrog', jfrogRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/azureai', azureaiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'VirtuVerse API',
    timestamp: new Date().toISOString()
  });
});

// VirtuSpace access endpoint (protected)
app.get('/api/virtuspace-access', authMiddleware, (req, res) => {
  res.json({
    virtuSpaceUrl: process.env.VIRTUSPACE_URL || 'http://localhost:3003',
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Integration status endpoint
app.get('/api/integrations/status', authMiddleware, (req, res) => {
  const integrations = {
    vm: {
      configured: !!(process.env.VM_SSH_HOST && process.env.VM_SSH_USER),
      host: process.env.VM_SSH_HOST,
      endpoint: '/api/vm'
    },
    postgres: {
      configured: !!(process.env.POSTGRES_HOST && process.env.POSTGRES_USER && process.env.POSTGRES_DB),
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      endpoint: '/api/postgres'
    },
    jfrog: {
      configured: !!(process.env.JFROG_URL && (process.env.JFROG_API_KEY || process.env.JFROG_USERNAME)),
      url: process.env.JFROG_URL,
      repository: process.env.JFROG_REPOSITORY,
      endpoint: '/api/jfrog'
    },
    github: {
      configured: !!(process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO),
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      endpoint: '/api/github'
    },
    azureai: {
      configured: !!(process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_API_KEY),
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      deployment: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
      apiEndpoint: '/api/azureai'
    }
  };

  res.json({
    status: 'success',
    integrations,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`VirtuVerse server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
