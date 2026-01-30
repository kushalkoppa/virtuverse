const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const db = require('../config/database');

// Get all workspaces for current user
router.get('/', authMiddleware, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, name, description, type, created_at, updated_at, status
      FROM workspaces 
      WHERE user_id = ? 
      ORDER BY updated_at DESC
    `);
    const workspaces = stmt.all(req.user.id);
    res.json(workspaces);
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    res.status(500).json({ error: 'Failed to fetch workspaces' });
  }
});

// Create new workspace
router.post('/', authMiddleware, (req, res) => {
  try {
    const { name, description, type } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Workspace name is required' });
    }

    const stmt = db.prepare(`
      INSERT INTO workspaces (user_id, name, description, type, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'active', datetime('now'), datetime('now'))
    `);
    
    const result = stmt.run(req.user.id, name, description || '', type || 'simulation');
    
    res.status(201).json({
      id: result.lastInsertRowid,
      name,
      description,
      type,
      status: 'active',
      message: 'Workspace created successfully'
    });
  } catch (error) {
    console.error('Error creating workspace:', error);
    res.status(500).json({ error: 'Failed to create workspace' });
  }
});

// Get workspace by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT * FROM workspaces 
      WHERE id = ? AND user_id = ?
    `);
    const workspace = stmt.get(req.params.id, req.user.id);
    
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }
    
    res.json(workspace);
  } catch (error) {
    console.error('Error fetching workspace:', error);
    res.status(500).json({ error: 'Failed to fetch workspace' });
  }
});

// Update workspace
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { name, description, type, status } = req.body;
    
    // Check if at least one field is provided
    if (!name && !description && !type && !status) {
      return res.status(400).json({ error: 'At least one field must be provided for update' });
    }
    
    const stmt = db.prepare(`
      UPDATE workspaces 
      SET name = COALESCE(?, name),
          description = COALESCE(?, description),
          type = COALESCE(?, type),
          status = COALESCE(?, status),
          updated_at = datetime('now')
      WHERE id = ? AND user_id = ?
    `);
    
    const result = stmt.run(name, description, type, status, req.params.id, req.user.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Workspace not found' });
    }
    
    res.json({ message: 'Workspace updated successfully' });
  } catch (error) {
    console.error('Error updating workspace:', error);
    res.status(500).json({ error: 'Failed to update workspace' });
  }
});

// Delete workspace
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const stmt = db.prepare(`
      DELETE FROM workspaces 
      WHERE id = ? AND user_id = ?
    `);
    
    const result = stmt.run(req.params.id, req.user.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Workspace not found' });
    }
    
    res.json({ message: 'Workspace deleted successfully' });
  } catch (error) {
    console.error('Error deleting workspace:', error);
    res.status(500).json({ error: 'Failed to delete workspace' });
  }
});

module.exports = router;
