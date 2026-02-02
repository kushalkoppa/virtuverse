const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const PlantModel = require('../models/PlantModel');
const metadataExtractor = require('../services/metadataExtractor');
const toolIntegration = require('../services/toolIntegration');
const idGenerator = require('../utils/idGenerator');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    // Accept common plant model file types
    const allowedExtensions = ['.spp', '.pss', '.sim', '.mdl', '.xml', '.json', '.fmu', '.mat', '.slx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: ' + allowedExtensions.join(', ')));
    }
  }
});

// In-memory storage for plant models (in production, use a database)
let plantModels = [
  new PlantModel({
    id: 'PM-L9C8XYZ-A1B2C',
    name: 'Assembly Line Model',
    description: 'Complete assembly line simulation model',
    type: 'Plant Simulation',
    version: '1.0.0',
    metadata: {
      author: 'John Doe',
      modifiedDate: new Date().toISOString(),
      sourceTool: 'Plant Simulation',
      interfaces: [
        { name: 'ConveyorSpeed', dataType: 'double', direction: 'input', unit: 'm/s' },
        { name: 'ProductCount', dataType: 'integer', direction: 'output', unit: 'count' }
      ],
      compatibility: {
        environmentModels: 85,
        virtualECUs: 70,
        plantModels: 90
      }
    }
  }),
  new PlantModel({
    id: 'PM-M8D7WXY-B2C3D',
    name: 'Manufacturing Process',
    description: 'End-to-end manufacturing process model',
    type: 'Process Simulator',
    version: '2.1.0',
    metadata: {
      author: 'Jane Smith',
      modifiedDate: new Date().toISOString(),
      sourceTool: 'Process Simulator',
      interfaces: [
        { name: 'Temperature', dataType: 'double', direction: 'input', unit: 'celsius' },
        { name: 'Pressure', dataType: 'double', direction: 'input', unit: 'bar' },
        { name: 'QualityMetric', dataType: 'double', direction: 'output', unit: 'percentage' }
      ],
      compatibility: {
        environmentModels: 75,
        virtualECUs: 65,
        plantModels: 88
      }
    }
  })
];

// GET available tools for integration - MUST be before /:id route
router.get('/tools/available', (req, res) => {
  const tools = toolIntegration.getAllTools();
  res.json(tools);
});

// GET all plant models
router.get('/', (req, res) => {
  res.json(plantModels.map(m => m.toJSON()));
});

// GET a specific plant model by ID
router.get('/:id', (req, res) => {
  const model = plantModels.find(m => m.id === req.params.id);
  if (!model) {
    return res.status(404).json({ error: 'Plant model not found' });
  }
  res.json(model.toJSON());
});

// GET version history for a model
router.get('/:id/versions', (req, res) => {
  const model = plantModels.find(m => m.id === req.params.id);
  if (!model) {
    return res.status(404).json({ error: 'Plant model not found' });
  }
  res.json({
    currentVersion: model.version,
    versionHistory: model.versionHistory
  });
});

// GET metadata for a model
router.get('/:id/metadata', (req, res) => {
  const model = plantModels.find(m => m.id === req.params.id);
  if (!model) {
    return res.status(404).json({ error: 'Plant model not found' });
  }
  res.json(model.metadata);
});

// POST create a new plant model (with file upload)
router.post('/', upload.single('modelFile'), async (req, res) => {
  try {
    const modelData = {
      id: idGenerator.generateModelId(),
      name: req.body.name || 'Unnamed Model',
      description: req.body.description || '',
      type: req.body.type || 'Plant Simulation',
      version: req.body.version || '1.0.0',
      status: 'active'
    };

    // If file was uploaded, extract metadata
    if (req.file) {
      modelData.filePath = req.file.path;
      modelData.fileSize = req.file.size;
      
      // Extract metadata from uploaded file
      const metadata = await metadataExtractor.extractMetadata(
        req.file.path,
        req.file.originalname
      );
      modelData.metadata = metadata;
    }

    const newModel = new PlantModel(modelData);
    plantModels.push(newModel);
    
    res.status(201).json({
      message: 'Plant model created successfully',
      model: newModel.toJSON()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to create plant model',
      details: error.message 
    });
  }
});

// PUT update a plant model (creates new version)
router.put('/:id', async (req, res) => {
  try {
    const modelIndex = plantModels.findIndex(m => m.id === req.params.id);
    if (modelIndex === -1) {
      return res.status(404).json({ error: 'Plant model not found' });
    }

    const currentModel = plantModels[modelIndex];
    const updates = {
      ...req.body,
      changeDescription: req.body.changeDescription || 'Model updated'
    };

    // Create new version
    const updatedModel = currentModel.createNewVersion(updates);
    plantModels[modelIndex] = updatedModel;

    res.json({
      message: 'Plant model updated with new version',
      model: updatedModel.toJSON()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to update plant model',
      details: error.message 
    });
  }
});

// DELETE a plant model
router.delete('/:id', (req, res) => {
  const modelIndex = plantModels.findIndex(m => m.id === req.params.id);
  if (modelIndex === -1) {
    return res.status(404).json({ error: 'Plant model not found' });
  }
  plantModels.splice(modelIndex, 1);
  res.status(204).send();
});

// POST open model in external tool
router.post('/:id/open-tool', async (req, res) => {
  try {
    const model = plantModels.find(m => m.id === req.params.id);
    if (!model) {
      return res.status(404).json({ error: 'Plant model not found' });
    }

    if (!model.filePath) {
      return res.status(400).json({ error: 'Model has no associated file' });
    }

    const toolName = req.body.toolName || model.metadata.sourceTool;
    const result = await toolIntegration.openInTool(model.filePath, toolName);

    res.json({
      message: 'Model opened in external tool',
      ...result
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to open model in tool',
      details: error.message 
    });
  }
});

// POST save edited model from external tool
router.post('/:id/save-from-tool', upload.single('editedFile'), async (req, res) => {
  try {
    const model = plantModels.find(m => m.id === req.params.id);
    if (!model) {
      return res.status(404).json({ error: 'Plant model not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract updated metadata
    const metadata = await metadataExtractor.updateMetadata(
      req.file.path,
      req.file.originalname,
      model.metadata
    );

    // Create new version with updated file
    const updates = {
      filePath: req.file.path,
      fileSize: req.file.size,
      metadata: metadata,
      changeDescription: req.body.changeDescription || 'Model edited in external tool'
    };

    const modelIndex = plantModels.findIndex(m => m.id === req.params.id);
    const updatedModel = model.createNewVersion(updates);
    plantModels[modelIndex] = updatedModel;

    res.json({
      message: 'Edited model saved as new version',
      model: updatedModel.toJSON()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to save edited model',
      details: error.message 
    });
  }
});

module.exports = router;
