const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const postgres = require('../config/postgres');

// Test PostgreSQL connection
router.get('/test', authMiddleware, async (req, res) => {
  try {
    const isConnected = await postgres.testConnection();
    if (isConnected) {
      res.json({ 
        status: 'success', 
        message: 'PostgreSQL connection successful',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({ 
        status: 'failed', 
        message: 'PostgreSQL connection failed' 
      });
    }
  } catch (error) {
    console.error('PostgreSQL test error:', error);
    res.status(500).json({ 
      status: 'failed', 
      message: 'PostgreSQL connection failed',
      error: error.message 
    });
  }
});

// Get PostgreSQL connection info
router.get('/info', authMiddleware, async (req, res) => {
  try {
    res.json({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT || 5432,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      ssl: process.env.POSTGRES_SSL === 'true'
    });
  } catch (error) {
    console.error('PostgreSQL info error:', error);
    res.status(500).json({ error: 'Failed to get PostgreSQL info' });
  }
});

// Execute custom query (admin only)
router.post('/query', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { query, params } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Restrict to SELECT queries for safety
    if (!query.trim().toLowerCase().startsWith('select')) {
      return res.status(400).json({ 
        error: 'Only SELECT queries are allowed through this endpoint' 
      });
    }

    const result = await postgres.query(query, params || []);
    
    res.json({
      status: 'success',
      rowCount: result.rowCount,
      rows: result.rows,
      fields: result.fields.map(f => ({ name: f.name, dataType: f.dataTypeID }))
    });
  } catch (error) {
    console.error('PostgreSQL query error:', error);
    res.status(500).json({ 
      status: 'failed',
      error: error.message 
    });
  }
});

// Get database statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const dbSize = await postgres.query(`
      SELECT pg_size_pretty(pg_database_size($1)) as size
    `, [process.env.POSTGRES_DB]);

    const tableCount = await postgres.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    const connectionCount = await postgres.query(`
      SELECT COUNT(*) as count 
      FROM pg_stat_activity 
      WHERE datname = $1
    `, [process.env.POSTGRES_DB]);

    res.json({
      status: 'success',
      database: process.env.POSTGRES_DB,
      size: dbSize.rows[0].size,
      tables: parseInt(tableCount.rows[0].count),
      activeConnections: parseInt(connectionCount.rows[0].count)
    });
  } catch (error) {
    console.error('PostgreSQL stats error:', error);
    res.status(500).json({ 
      status: 'failed',
      error: error.message 
    });
  }
});

module.exports = router;
