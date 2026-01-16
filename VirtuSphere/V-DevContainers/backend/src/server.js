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

// Mock project data
const sampleProjects = [
  {
    id: 1,
    name: 'Simulation Project Alpha',
    source: 'V-Orchestrator',
    type: 'open-loop',
    components: ['model1', 'model2', 'controller'],
    lastModified: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Plant Simulation Beta',
    source: 'PlantHub',
    type: 'manufacturing',
    components: ['factory-model', 'process-simulator'],
    lastModified: new Date().toISOString()
  }
];

// Mock component data
const sampleComponents = [
  { id: 1, name: 'CarMaker Model', source: 'EnviHub', type: 'simulation' },
  { id: 2, name: 'Simulink Component', source: 'EnviHub', type: 'model' },
  { id: 3, name: 'Factory Process', source: 'PlantHub', type: 'manufacturing' }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'V-DevContainers API',
    timestamp: new Date().toISOString()
  });
});

// Get all projects
app.get('/api/projects', (req, res) => {
  res.json(sampleProjects);
});

// Get project by ID
app.get('/api/projects/:id', (req, res) => {
  const project = sampleProjects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Get all components
app.get('/api/components', (req, res) => {
  res.json(sampleComponents);
});

// Get component by ID
app.get('/api/components/:id', (req, res) => {
  const component = sampleComponents.find(c => c.id === parseInt(req.params.id));
  if (!component) {
    return res.status(404).json({ error: 'Component not found' });
  }
  res.json(component);
});

// Generate DevContainer from project
app.post('/api/generate/project/:id', async (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = sampleProjects.find(p => p.id === projectId);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  // Mock DevContainer generation
  const devcontainer = {
    name: `devcontainer-${project.name.toLowerCase().replace(/\s+/g, '-')}`,
    image: 'mcr.microsoft.com/devcontainers/base:ubuntu',
    features: {
      'ghcr.io/devcontainers/features/node:1': {},
      'ghcr.io/devcontainers/features/python:1': {}
    },
    customizations: {
      vscode: {
        extensions: ['ms-python.python', 'dbaeumer.vscode-eslint']
      }
    },
    forwardPorts: [3000, 5000],
    postCreateCommand: 'npm install',
    remoteUser: 'vscode',
    metadata: {
      projectId: project.id,
      projectName: project.name,
      source: project.source,
      generatedAt: new Date().toISOString()
    }
  };

  res.json({
    success: true,
    devcontainer,
    message: `DevContainer configuration generated for project: ${project.name}`
  });
});

// Generate DevContainer from components
app.post('/api/generate/components', async (req, res) => {
  const { componentIds } = req.body;
  
  if (!componentIds || !Array.isArray(componentIds) || componentIds.length === 0) {
    return res.status(400).json({ error: 'Component IDs are required' });
  }

  const components = sampleComponents.filter(c => componentIds.includes(c.id));
  
  if (components.length === 0) {
    return res.status(404).json({ error: 'No valid components found' });
  }

  // Mock DevContainer generation
  const devcontainer = {
    name: 'devcontainer-custom-components',
    image: 'mcr.microsoft.com/devcontainers/base:ubuntu',
    features: {
      'ghcr.io/devcontainers/features/node:1': {},
      'ghcr.io/devcontainers/features/docker-in-docker:1': {}
    },
    customizations: {
      vscode: {
        extensions: ['ms-azuretools.vscode-docker']
      }
    },
    forwardPorts: [3000],
    postCreateCommand: 'echo "DevContainer ready"',
    remoteUser: 'vscode',
    metadata: {
      components: components.map(c => ({ id: c.id, name: c.name, source: c.source })),
      generatedAt: new Date().toISOString()
    }
  };

  res.json({
    success: true,
    devcontainer,
    message: `DevContainer configuration generated for ${components.length} component(s)`
  });
});

// Get DevContainer templates
app.get('/api/templates', (req, res) => {
  const templates = [
    {
      id: 1,
      name: 'Basic Node.js',
      description: 'Simple Node.js development environment',
      image: 'mcr.microsoft.com/devcontainers/javascript-node:18'
    },
    {
      id: 2,
      name: 'Python + Data Science',
      description: 'Python environment with data science tools',
      image: 'mcr.microsoft.com/devcontainers/python:3.11'
    },
    {
      id: 3,
      name: 'Full Stack',
      description: 'Node.js + Python + Docker',
      image: 'mcr.microsoft.com/devcontainers/base:ubuntu'
    }
  ];
  
  res.json(templates);
});

// Start server
app.listen(PORT, () => {
  console.log(`V-DevContainers server running on port ${PORT}`);
});

module.exports = app;
