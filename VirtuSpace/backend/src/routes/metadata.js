const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { db } = require('../config/database');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'metadata-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Extract metadata from uploaded file
router.post('/extract', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Simulate metadata extraction
    // In production, this would parse the actual file format
    const metadata = {
      basic: {
        fileName: file.originalname,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        fileType: file.mimetype,
        lastModified: new Date(file.mtime || Date.now()).toLocaleString()
      },
      simulation: {
        toolVersion: 'IPG CarMaker 12.0',
        modelType: 'Vehicle Dynamics',
        simulationTime: '100.0 seconds',
        stepSize: '0.001 seconds'
      },
      parameters: {
        vehicleMass: '1500 kg',
        wheelbase: '2.7 m',
        trackWidth: '1.5 m',
        cogHeight: '0.5 m'
      },
      interfaces: {
        inputs: ['Steering Angle', 'Throttle Position', 'Brake Pressure'],
        outputs: ['Vehicle Speed', 'Lateral Acceleration', 'Yaw Rate', 'Position X/Y'],
        protocol: 'FMI 2.0'
      },
      smartHarness: {
        compatibleTools: ['MATLAB/Simulink', 'dSPACE VEOS', 'CarMaker'],
        integrationPoints: 4,
        cosimReady: true,
        fmuExport: true
      }
    };

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      metadata: metadata
    });
  } catch (error) {
    // Clean up on error
    if (file && file.path) {
      try {
        fs.unlinkSync(file.path);
      } catch (unlinkErr) {
        console.error('Error cleaning up file:', unlinkErr);
      }
    }
    res.status(500).json({ error: error.message });
  }
});

// Get metadata for a specific model
router.get('/model/:modelId', (req, res) => {
  const query = `
    SELECT m.*, md.metadata_json, md.extracted_at
    FROM models m
    LEFT JOIN metadata md ON m.id = md.model_id
    WHERE m.id = ?
  `;

  db.get(query, [req.params.modelId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Model not found' });
    }

    res.json({
      model: {
        id: row.id,
        name: row.name,
        type: row.type,
        version: row.version
      },
      metadata: row.metadata_json ? JSON.parse(row.metadata_json) : null,
      extractedAt: row.extracted_at
    });
  });
});

// Save extracted metadata for a model
router.post('/model/:modelId', (req, res) => {
  const { metadata } = req.body;

  if (!metadata) {
    return res.status(400).json({ error: 'Metadata is required' });
  }

  // First check if model exists
  db.get('SELECT id FROM models WHERE id = ?', [req.params.modelId], (err, model) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!model) {
      return res.status(404).json({ error: 'Model not found' });
    }

    // Check if metadata already exists
    db.get('SELECT id FROM metadata WHERE model_id = ?', [req.params.modelId], (err, existing) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const metadataJson = JSON.stringify(metadata);

      if (existing) {
        // Update existing metadata
        const updateQuery = `
          UPDATE metadata 
          SET metadata_json = ?, extracted_at = CURRENT_TIMESTAMP
          WHERE model_id = ?
        `;

        db.run(updateQuery, [metadataJson, req.params.modelId], function(updateErr) {
          if (updateErr) {
            return res.status(500).json({ error: updateErr.message });
          }
          res.json({ message: 'Metadata updated successfully' });
        });
      } else {
        // Insert new metadata
        const insertQuery = `
          INSERT INTO metadata (model_id, metadata_json)
          VALUES (?, ?)
        `;

        db.run(insertQuery, [req.params.modelId, metadataJson], function(insertErr) {
          if (insertErr) {
            return res.status(500).json({ error: insertErr.message });
          }
          res.json({ 
            message: 'Metadata saved successfully',
            metadataId: this.lastID
          });
        });
      }
    });
  });
});

// Get all models with metadata
router.get('/all', (req, res) => {
  const query = `
    SELECT m.*, md.metadata_json, md.extracted_at
    FROM models m
    LEFT JOIN metadata md ON m.id = md.model_id
    ORDER BY m.modified_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const results = rows.map(row => ({
      id: row.id,
      name: row.name,
      type: row.type,
      version: row.version,
      hasMetadata: !!row.metadata_json,
      extractedAt: row.extracted_at
    }));

    res.json(results);
  });
});

// Generate smart harness integration file
router.get('/model/:modelId/harness', (req, res) => {
  const query = `
    SELECT m.*, md.metadata_json
    FROM models m
    LEFT JOIN metadata md ON m.id = md.model_id
    WHERE m.id = ?
  `;

  db.get(query, [req.params.modelId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Model not found' });
    }

    const metadata = row.metadata_json ? JSON.parse(row.metadata_json) : null;
    
    if (!metadata) {
      return res.status(404).json({ error: 'No metadata available for this model' });
    }

    // Generate smart harness configuration
    const harnessConfig = {
      modelName: row.name,
      modelType: row.type,
      version: row.version,
      compatibilityLayer: {
        fmi: metadata.interfaces?.protocol || 'FMI 2.0',
        tools: metadata.smartHarness?.compatibleTools || [],
        cosimulationReady: metadata.smartHarness?.cosimReady || false
      },
      interfaces: {
        inputs: metadata.interfaces?.inputs || [],
        outputs: metadata.interfaces?.outputs || []
      },
      parameters: metadata.parameters || {},
      integrationMetadata: {
        generatedAt: new Date().toISOString(),
        generatedBy: 'EnviHub Smart Harness Generator'
      }
    };

    res.json(harnessConfig);
  });
});

module.exports = router;
