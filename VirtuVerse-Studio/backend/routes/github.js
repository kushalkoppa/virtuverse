const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authMiddleware } = require('../middleware/auth');

// Get GitHub client
const getGitHubClient = () => {
  return axios.create({
    baseURL: process.env.GITHUB_API_URL || 'https://api.github.com',
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    },
    timeout: 10000
  });
};

// Test GitHub connection
router.get('/test', authMiddleware, async (req, res) => {
  try {
    const client = getGitHubClient();
    const response = await client.get('/user');
    
    res.json({
      status: 'success',
      message: 'GitHub connection successful',
      user: response.data.login
    });
  } catch (error) {
    console.error('GitHub connection test failed:', error);
    res.status(500).json({
      status: 'failed',
      message: 'GitHub connection failed',
      error: error.message
    });
  }
});

// Get repository information
router.get('/repository', authMiddleware, async (req, res) => {
  try {
    const client = getGitHubClient();
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    
    const response = await client.get(`/repos/${owner}/${repo}`);
    
    res.json({
      status: 'success',
      repository: {
        name: response.data.name,
        fullName: response.data.full_name,
        description: response.data.description,
        private: response.data.private,
        url: response.data.html_url,
        defaultBranch: response.data.default_branch,
        stars: response.data.stargazers_count,
        forks: response.data.forks_count,
        openIssues: response.data.open_issues_count,
        language: response.data.language,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at
      }
    });
  } catch (error) {
    console.error('Failed to get repository info:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// List branches
router.get('/branches', authMiddleware, async (req, res) => {
  try {
    const client = getGitHubClient();
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    
    const response = await client.get(`/repos/${owner}/${repo}/branches`);
    
    res.json({
      status: 'success',
      branches: response.data.map(branch => ({
        name: branch.name,
        commit: branch.commit.sha,
        protected: branch.protected
      }))
    });
  } catch (error) {
    console.error('Failed to list branches:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// List commits
router.get('/commits', authMiddleware, async (req, res) => {
  try {
    const client = getGitHubClient();
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const { branch, per_page = 10 } = req.query;
    
    const params = { per_page };
    if (branch) {
      params.sha = branch;
    }
    
    const response = await client.get(`/repos/${owner}/${repo}/commits`, { params });
    
    res.json({
      status: 'success',
      commits: response.data.map(commit => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: commit.commit.author.date,
        url: commit.html_url
      }))
    });
  } catch (error) {
    console.error('Failed to list commits:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Get file content
router.get('/content', authMiddleware, async (req, res) => {
  try {
    const client = getGitHubClient();
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const { path, ref } = req.query;
    
    if (!path) {
      return res.status(400).json({ error: 'Path is required' });
    }
    
    const params = {};
    if (ref) {
      params.ref = ref;
    }
    
    const response = await client.get(`/repos/${owner}/${repo}/contents/${path}`, { params });
    
    // Decode base64 content if it's a file
    let content = response.data.content;
    if (content) {
      content = Buffer.from(content, 'base64').toString('utf-8');
    }
    
    res.json({
      status: 'success',
      file: {
        name: response.data.name,
        path: response.data.path,
        type: response.data.type,
        size: response.data.size,
        sha: response.data.sha,
        content: content,
        url: response.data.html_url
      }
    });
  } catch (error) {
    console.error('Failed to get file content:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Create or update file
router.post('/content', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const client = getGitHubClient();
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const { path, content, message, branch, sha } = req.body;
    
    if (!path || !content || !message) {
      return res.status(400).json({ 
        error: 'Path, content, and commit message are required' 
      });
    }
    
    const data = {
      message,
      content: Buffer.from(content).toString('base64'),
    };
    
    if (branch) {
      data.branch = branch;
    }
    
    if (sha) {
      data.sha = sha; // Required for updates
    }
    
    const response = await client.put(`/repos/${owner}/${repo}/contents/${path}`, data);
    
    res.json({
      status: 'success',
      message: 'File created/updated successfully',
      commit: {
        sha: response.data.commit.sha,
        url: response.data.commit.html_url
      }
    });
  } catch (error) {
    console.error('Failed to create/update file:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// List pull requests
router.get('/pulls', authMiddleware, async (req, res) => {
  try {
    const client = getGitHubClient();
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const { state = 'open', per_page = 10 } = req.query;
    
    const response = await client.get(`/repos/${owner}/${repo}/pulls`, {
      params: { state, per_page }
    });
    
    res.json({
      status: 'success',
      pullRequests: response.data.map(pr => ({
        number: pr.number,
        title: pr.title,
        state: pr.state,
        author: pr.user.login,
        createdAt: pr.created_at,
        updatedAt: pr.updated_at,
        url: pr.html_url
      }))
    });
  } catch (error) {
    console.error('Failed to list pull requests:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// List issues
router.get('/issues', authMiddleware, async (req, res) => {
  try {
    const client = getGitHubClient();
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const { state = 'open', per_page = 10 } = req.query;
    
    const response = await client.get(`/repos/${owner}/${repo}/issues`, {
      params: { state, per_page }
    });
    
    res.json({
      status: 'success',
      issues: response.data.map(issue => ({
        number: issue.number,
        title: issue.title,
        state: issue.state,
        author: issue.user.login,
        labels: issue.labels.map(l => l.name),
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
        url: issue.html_url
      }))
    });
  } catch (error) {
    console.error('Failed to list issues:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

module.exports = router;
