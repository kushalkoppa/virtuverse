const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const db = require('../config/database');

// Get all projects for a workspace
router.get('/workspace/:workspaceId', authMiddleware, (req, res) => {
  try {
    // First verify workspace belongs to user
    const workspaceStmt = db.prepare('SELECT id FROM workspaces WHERE id = ? AND user_id = ?');
    const workspace = workspaceStmt.get(req.params.workspaceId, req.user.id);
    
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    const stmt = db.prepare(`
      SELECT id, workspace_id, name, description, type, config, status, created_at, updated_at
      FROM projects 
      WHERE workspace_id = ? 
      ORDER BY updated_at DESC
    `);
    const projects = stmt.all(req.params.workspaceId);
    
    // Parse config JSON for each project
    const parsedProjects = projects.map(p => ({
      ...p,
      config: p.config ? JSON.parse(p.config) : {}
    }));
    
    res.json(parsedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create new project
router.post('/', authMiddleware, (req, res) => {
  try {
    const { workspace_id, name, description, type, config } = req.body;
    
    if (!name || !workspace_id) {
      return res.status(400).json({ error: 'Project name and workspace_id are required' });
    }

    // Verify workspace belongs to user
    const workspaceStmt = db.prepare('SELECT id FROM workspaces WHERE id = ? AND user_id = ?');
    const workspace = workspaceStmt.get(workspace_id, req.user.id);
    
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    const stmt = db.prepare(`
      INSERT INTO projects (workspace_id, name, description, type, config, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 'active', datetime('now'), datetime('now'))
    `);
    
    const configJson = config ? JSON.stringify(config) : '{}';
    const result = stmt.run(workspace_id, name, description || '', type || 'simulation', configJson);
    
    res.status(201).json({
      id: result.lastInsertRowid,
      workspace_id,
      name,
      description,
      type,
      config: config || {},
      status: 'active',
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Get project by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT p.*, w.user_id 
      FROM projects p
      JOIN workspaces w ON p.workspace_id = w.id
      WHERE p.id = ? AND w.user_id = ?
    `);
    const project = stmt.get(req.params.id, req.user.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Parse config JSON
    project.config = project.config ? JSON.parse(project.config) : {};
    delete project.user_id;
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Update project
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { name, description, type, config, status } = req.body;
    
    // Check if at least one field is provided
    if (!name && !description && !type && !config && !status) {
      return res.status(400).json({ error: 'At least one field must be provided for update' });
    }
    
    // Verify project belongs to user
    const checkStmt = db.prepare(`
      SELECT p.id 
      FROM projects p
      JOIN workspaces w ON p.workspace_id = w.id
      WHERE p.id = ? AND w.user_id = ?
    `);
    const project = checkStmt.get(req.params.id, req.user.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const configJson = config ? JSON.stringify(config) : null;
    
    const stmt = db.prepare(`
      UPDATE projects 
      SET name = COALESCE(?, name),
          description = COALESCE(?, description),
          type = COALESCE(?, type),
          config = COALESCE(?, config),
          status = COALESCE(?, status),
          updated_at = datetime('now')
      WHERE id = ?
    `);
    
    stmt.run(name, description, type, configJson, status, req.params.id);
    
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    // Verify project belongs to user
    const checkStmt = db.prepare(`
      SELECT p.id 
      FROM projects p
      JOIN workspaces w ON p.workspace_id = w.id
      WHERE p.id = ? AND w.user_id = ?
    `);
    const project = checkStmt.get(req.params.id, req.user.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    stmt.run(req.params.id);
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
