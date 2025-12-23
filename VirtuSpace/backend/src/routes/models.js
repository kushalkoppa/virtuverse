const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { db } = require('../config/database');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Get all models
router.get('/', (req, res) => {
  const { type, shared } = req.query;
  let query = 'SELECT * FROM models WHERE 1=1';
  const params = [];

  if (type && type !== 'all') {
    query += ' AND type = ?';
    params.push(type);
  }

  if (shared !== undefined) {
    query += ' AND shared = ?';
    params.push(shared === 'true' ? 1 : 0);
  }

  query += ' ORDER BY modified_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Parse tags from string to array
    const models = rows.map(row => ({
      ...row,
      tags: row.tags ? row.tags.split(',') : [],
      shared: Boolean(row.shared)
    }));
    
    res.json(models);
  });
});

// Get single model
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM models WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Model not found' });
    }
    
    res.json({
      ...row,
      tags: row.tags ? row.tags.split(',') : [],
      shared: Boolean(row.shared)
    });
  });
});

// Upload new model
router.post('/upload', upload.single('file'), (req, res) => {
  const { name, type, version, author, tags, description, shared } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const size = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
  const filePath = file.path;

  const query = `
    INSERT INTO models (name, type, version, author, size, file_path, shared, tags, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    name || file.originalname,
    type || 'Unknown',
    version || 'v1.0',
    author || 'Anonymous',
    size,
    filePath,
    shared === 'true' ? 1 : 0,
    tags || '',
    description || ''
  ];

  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    res.json({
      message: 'Model uploaded successfully',
      modelId: this.lastID
    });
  });
});

// Update model
router.put('/:id', (req, res) => {
  const { name, type, version, author, tags, description, shared } = req.body;
  
  const query = `
    UPDATE models 
    SET name = ?, type = ?, version = ?, author = ?, tags = ?, description = ?, 
        shared = ?, modified_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  const params = [
    name,
    type,
    version,
    author,
    Array.isArray(tags) ? tags.join(',') : tags,
    description,
    shared ? 1 : 0,
    req.params.id
  ];

  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Model not found' });
    }
    
    res.json({ message: 'Model updated successfully' });
  });
});

// Delete model
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM models WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Model not found' });
    }
    
    res.json({ message: 'Model deleted successfully' });
  });
});

// Get model statistics
router.get('/stats/summary', (req, res) => {
  const queries = {
    total: 'SELECT COUNT(*) as count FROM models',
    shared: 'SELECT COUNT(*) as count FROM models WHERE shared = 1',
    byType: 'SELECT type, COUNT(*) as count FROM models GROUP BY type'
  };

  Promise.all([
    new Promise((resolve, reject) => {
      db.get(queries.total, (err, row) => err ? reject(err) : resolve(row.count));
    }),
    new Promise((resolve, reject) => {
      db.get(queries.shared, (err, row) => err ? reject(err) : resolve(row.count));
    }),
    new Promise((resolve, reject) => {
      db.all(queries.byType, (err, rows) => err ? reject(err) : resolve(rows));
    })
  ])
  .then(([total, shared, byType]) => {
    res.json({
      totalModels: total,
      sharedModels: shared,
      byType: byType
    });
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
});

module.exports = router;
