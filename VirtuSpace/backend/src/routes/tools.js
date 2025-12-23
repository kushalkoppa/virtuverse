const express = require('express');
const router = express.Router();
const axios = require('axios');
const { db } = require('../config/database');

// Get all tool integrations
router.get('/', (req, res) => {
  db.all('SELECT * FROM tool_integrations ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get single tool integration
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM tool_integrations WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Tool integration not found' });
    }
    res.json(row);
  });
});

// Add new tool integration
router.post('/', (req, res) => {
  const { name, version, endpoint, api_key, description } = req.body;

  if (!name || !endpoint) {
    return res.status(400).json({ error: 'Name and endpoint are required' });
  }

  const query = `
    INSERT INTO tool_integrations (name, version, endpoint, api_key, description, status)
    VALUES (?, ?, ?, ?, ?, 'disconnected')
  `;

  db.run(query, [name, version, endpoint, api_key, description], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    res.json({
      message: 'Tool integration added successfully',
      toolId: this.lastID
    });
  });
});

// Test tool connection
router.post('/:id/test', async (req, res) => {
  db.get('SELECT * FROM tool_integrations WHERE id = ?', [req.params.id], async (err, tool) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!tool) {
      return res.status(404).json({ error: 'Tool integration not found' });
    }

    try {
      // Try to connect to the tool endpoint
      const response = await axios.get(tool.endpoint, {
        timeout: 5000,
        headers: tool.api_key ? { 'Authorization': `Bearer ${tool.api_key}` } : {}
      });

      // Update status to connected
      const updateQuery = `
        UPDATE tool_integrations 
        SET status = 'connected', last_sync = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      db.run(updateQuery, [req.params.id], (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ error: updateErr.message });
        }
        
        res.json({
          success: true,
          message: 'Connection successful',
          status: 'connected',
          response: response.data
        });
      });
    } catch (error) {
      // Update status to disconnected
      const updateQuery = `
        UPDATE tool_integrations 
        SET status = 'disconnected'
        WHERE id = ?
      `;

      db.run(updateQuery, [req.params.id], (updateErr) => {
        res.json({
          success: false,
          message: 'Connection failed',
          status: 'disconnected',
          error: error.message
        });
      });
    }
  });
});

// Sync models with tool
router.post('/:id/sync', (req, res) => {
  db.get('SELECT * FROM tool_integrations WHERE id = ?', [req.params.id], (err, tool) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!tool) {
      return res.status(404).json({ error: 'Tool integration not found' });
    }

    // Simulate sync operation
    // In production, this would actually sync with the external tool
    const updateQuery = `
      UPDATE tool_integrations 
      SET last_sync = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.run(updateQuery, [req.params.id], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ error: updateErr.message });
      }
      
      res.json({
        success: true,
        message: `Models synced with ${tool.name}`,
        syncedAt: new Date().toISOString()
      });
    });
  });
});

// Update tool integration
router.put('/:id', (req, res) => {
  const { name, version, endpoint, api_key, description, status } = req.body;
  
  const query = `
    UPDATE tool_integrations 
    SET name = ?, version = ?, endpoint = ?, api_key = ?, description = ?, status = ?
    WHERE id = ?
  `;

  db.run(query, [name, version, endpoint, api_key, description, status, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Tool integration not found' });
    }
    
    res.json({ message: 'Tool integration updated successfully' });
  });
});

// Delete tool integration
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tool_integrations WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Tool integration not found' });
    }
    
    res.json({ message: 'Tool integration deleted successfully' });
  });
});

// IPG CarMaker specific endpoint
router.get('/carmaker/models', async (req, res) => {
  try {
    // In production, this would fetch models from IPG CarMaker
    // For now, return mock data
    const carmakerModels = [
      {
        name: 'Vehicle_Dynamics_Model',
        version: '2.1',
        type: 'VehicleDynamics',
        lastModified: new Date().toISOString()
      }
    ];
    
    res.json(carmakerModels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
