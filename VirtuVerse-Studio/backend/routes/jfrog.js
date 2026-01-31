const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authMiddleware } = require('../middleware/auth');

// Get JFrog Artifactory client
const getJFrogClient = () => {
  const auth = process.env.JFROG_API_KEY 
    ? { headers: { 'X-JFrog-Art-Api': process.env.JFROG_API_KEY } }
    : {
        auth: {
          username: process.env.JFROG_USERNAME,
          password: process.env.JFROG_PASSWORD
        }
      };

  return axios.create({
    baseURL: process.env.JFROG_URL,
    ...auth,
    timeout: 10000
  });
};

// Test JFrog connection
router.get('/test', authMiddleware, async (req, res) => {
  try {
    const client = getJFrogClient();
    const response = await client.get('/artifactory/api/system/ping');
    
    res.json({
      status: 'success',
      message: 'JFrog Artifactory connection successful',
      response: response.data
    });
  } catch (error) {
    console.error('JFrog connection test failed:', error);
    res.status(500).json({
      status: 'failed',
      message: 'JFrog Artifactory connection failed',
      error: error.message
    });
  }
});

// Get repository information
router.get('/repositories', authMiddleware, async (req, res) => {
  try {
    const client = getJFrogClient();
    const response = await client.get('/artifactory/api/repositories');
    
    res.json({
      status: 'success',
      repositories: response.data
    });
  } catch (error) {
    console.error('Failed to get repositories:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// List artifacts in repository
router.get('/artifacts/:repo', authMiddleware, async (req, res) => {
  try {
    const { repo } = req.params;
    const { path = '' } = req.query;
    
    const client = getJFrogClient();
    const response = await client.get(`/artifactory/api/storage/${repo}/${path}`);
    
    res.json({
      status: 'success',
      repository: repo,
      path,
      artifacts: response.data
    });
  } catch (error) {
    console.error('Failed to list artifacts:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Upload artifact
router.post('/artifacts/:repo', authMiddleware, async (req, res) => {
  try {
    const { repo } = req.params;
    const { path, content } = req.body;
    
    if (!path || !content) {
      return res.status(400).json({ error: 'Path and content are required' });
    }

    const client = getJFrogClient();
    const response = await client.put(
      `/artifactory/${repo}/${path}`,
      content,
      {
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      }
    );
    
    res.json({
      status: 'success',
      message: 'Artifact uploaded successfully',
      response: response.data
    });
  } catch (error) {
    console.error('Failed to upload artifact:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Download artifact
router.get('/artifacts/:repo/download', authMiddleware, async (req, res) => {
  try {
    const { repo } = req.params;
    const { path } = req.query;
    
    if (!path) {
      return res.status(400).json({ error: 'Path is required' });
    }

    const client = getJFrogClient();
    const response = await client.get(`/artifactory/${repo}/${path}`, {
      responseType: 'arraybuffer'
    });
    
    res.set('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    res.send(response.data);
  } catch (error) {
    console.error('Failed to download artifact:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Delete artifact
router.delete('/artifacts/:repo', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { repo } = req.params;
    const { path } = req.query;
    
    if (!path) {
      return res.status(400).json({ error: 'Path is required' });
    }

    const client = getJFrogClient();
    const response = await client.delete(`/artifactory/${repo}/${path}`);
    
    res.json({
      status: 'success',
      message: 'Artifact deleted successfully',
      response: response.data
    });
  } catch (error) {
    console.error('Failed to delete artifact:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Search artifacts
router.post('/search', authMiddleware, async (req, res) => {
  try {
    const { name, repos } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Search name is required' });
    }

    const client = getJFrogClient();
    const response = await client.get('/artifactory/api/search/artifact', {
      params: {
        name,
        repos: repos ? repos.join(',') : undefined
      }
    });
    
    res.json({
      status: 'success',
      results: response.data.results || []
    });
  } catch (error) {
    console.error('Failed to search artifacts:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

module.exports = router;
