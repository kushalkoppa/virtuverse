const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for DevContainer configurations
// NOTE: For production deployment, replace this with a database (SQLite, PostgreSQL, etc.)
// to ensure data persistence across service restarts
let devcontainerConfigs = [];
let configIdCounter = 1;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'V-DevContainers API',
    timestamp: new Date().toISOString()
  });
});

// Get all DevContainer configurations
app.get('/api/devcontainers', (req, res) => {
  try {
    res.json(devcontainerConfigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get DevContainer configuration by ID
app.get('/api/devcontainers/:id', (req, res) => {
  try {
    const config = devcontainerConfigs.find(c => c.id === parseInt(req.params.id));
    if (!config) {
      return res.status(404).json({ error: 'DevContainer configuration not found' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new DevContainer configuration
app.post('/api/devcontainers', (req, res) => {
  try {
    const { name, description, components, baseImage, features } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newConfig = {
      id: configIdCounter++,
      name,
      description: description || '',
      components: components || [],
      baseImage: baseImage || 'mcr.microsoft.com/devcontainers/base:ubuntu',
      features: features || [],
      status: 'created',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    devcontainerConfigs.push(newConfig);
    res.status(201).json(newConfig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update DevContainer configuration
app.put('/api/devcontainers/:id', (req, res) => {
  try {
    const index = devcontainerConfigs.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'DevContainer configuration not found' });
    }

    // Check if at least one field is provided
    const { name, description, components, baseImage, features } = req.body;
    if (!name && !description && !components && !baseImage && !features) {
      return res.status(400).json({ error: 'At least one field must be provided for update' });
    }

    devcontainerConfigs[index] = {
      ...devcontainerConfigs[index],
      ...req.body,
      id: parseInt(req.params.id),
      updated_at: new Date().toISOString()
    };

    res.json(devcontainerConfigs[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete DevContainer configuration
app.delete('/api/devcontainers/:id', (req, res) => {
  try {
    const index = devcontainerConfigs.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'DevContainer configuration not found' });
    }

    devcontainerConfigs.splice(index, 1);
    res.json({ message: 'DevContainer configuration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate DevContainer JSON
app.post('/api/devcontainers/:id/generate', (req, res) => {
  try {
    const config = devcontainerConfigs.find(c => c.id === parseInt(req.params.id));
    if (!config) {
      return res.status(404).json({ error: 'DevContainer configuration not found' });
    }

    const devcontainerJson = {
      name: config.name,
      image: config.baseImage,
      features: config.features.reduce((acc, feature) => {
        acc[feature] = {};
        return acc;
      }, {}),
      customizations: {
        vscode: {
          extensions: [
            "ms-vscode.cpptools",
            "ms-python.python",
            "ms-azuretools.vscode-docker"
          ]
        }
      },
      forwardPorts: [3000, 5000, 8080],
      postCreateCommand: "npm install",
      remoteUser: "vscode"
    };

    res.json({
      config: devcontainerJson,
      filename: '.devcontainer/devcontainer.json'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available components from VirtuSpace
app.get('/api/components', async (req, res) => {
  try {
    const virtuSpaceUrl = process.env.VIRTUSPACE_URL || 'http://localhost:3003';
    
    // Mock components data
    const components = [
      {
        id: 'envihub',
        name: 'EnviHub',
        description: 'Environment simulation component',
        type: 'simulation',
        dependencies: ['ipg-carmaker', 'fmu-runtime']
      },
      {
        id: 'planthub',
        name: 'PlantHub',
        description: 'Plant simulation component',
        type: 'simulation',
        dependencies: ['matlab-runtime', 'simulink-coder']
      },
      {
        id: 'v-orchestrator',
        name: 'V-Orchestrator',
        description: 'Orchestration component',
        type: 'orchestration',
        dependencies: ['python3', 'docker']
      }
    ];

    res.json(components);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available base images
app.get('/api/base-images', (req, res) => {
  try {
    const baseImages = [
      {
        id: 'ubuntu',
        name: 'Ubuntu',
        image: 'mcr.microsoft.com/devcontainers/base:ubuntu',
        description: 'Ubuntu-based development container'
      },
      {
        id: 'python',
        name: 'Python',
        image: 'mcr.microsoft.com/devcontainers/python:3.11',
        description: 'Python development container'
      },
      {
        id: 'cpp',
        name: 'C++',
        image: 'mcr.microsoft.com/devcontainers/cpp:debian',
        description: 'C++ development container'
      },
      {
        id: 'node',
        name: 'Node.js',
        image: 'mcr.microsoft.com/devcontainers/javascript-node:18',
        description: 'Node.js development container'
      }
    ];

    res.json(baseImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available DevContainer features
app.get('/api/features', (req, res) => {
  try {
    const features = [
      {
        id: 'docker-in-docker',
        name: 'Docker in Docker',
        feature: 'ghcr.io/devcontainers/features/docker-in-docker:2',
        description: 'Access Docker from inside the container'
      },
      {
        id: 'git',
        name: 'Git',
        feature: 'ghcr.io/devcontainers/features/git:1',
        description: 'Git version control'
      },
      {
        id: 'python',
        name: 'Python',
        feature: 'ghcr.io/devcontainers/features/python:1',
        description: 'Python runtime and pip'
      },
      {
        id: 'node',
        name: 'Node.js',
        feature: 'ghcr.io/devcontainers/features/node:1',
        description: 'Node.js runtime and npm'
      },
      {
        id: 'azure-cli',
        name: 'Azure CLI',
        feature: 'ghcr.io/devcontainers/features/azure-cli:1',
        description: 'Azure command-line interface'
      }
    ];

    res.json(features);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`V-DevContainers server running on port ${PORT}`);
});

module.exports = app;
