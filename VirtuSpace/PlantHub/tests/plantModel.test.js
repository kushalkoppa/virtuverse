/**
 * Tests for Plant Model Management Backend
 */

const request = require('supertest');
const app = require('../backend/server');
const PlantModel = require('../backend/models/PlantModel');
const metadataExtractor = require('../backend/services/metadataExtractor');
const toolIntegration = require('../backend/services/toolIntegration');
const idGenerator = require('../backend/utils/idGenerator');

describe('Plant Model Management API', () => {
  
  describe('GET /api/plant-models', () => {
    it('should return all plant models', async () => {
      const response = await request(app)
        .get('/api/plant-models')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/plant-models/:id', () => {
    it('should return a specific plant model', async () => {
      const response = await request(app)
        .get('/api/plant-models/PM-L9C8XYZ-A1B2C')
        .expect(200);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('metadata');
      expect(response.body.metadata).toHaveProperty('author');
      expect(response.body.metadata).toHaveProperty('interfaces');
      expect(response.body.metadata).toHaveProperty('compatibility');
    });

    it('should return 404 for non-existent model', async () => {
      await request(app)
        .get('/api/plant-models/nonexistent')
        .expect(404);
    });
  });

  describe('GET /api/plant-models/:id/metadata', () => {
    it('should return metadata for a model', async () => {
      const response = await request(app)
        .get('/api/plant-models/PM-L9C8XYZ-A1B2C/metadata')
        .expect(200);
      
      expect(response.body).toHaveProperty('author');
      expect(response.body).toHaveProperty('modifiedDate');
      expect(response.body).toHaveProperty('sourceTool');
      expect(response.body).toHaveProperty('interfaces');
      expect(response.body).toHaveProperty('compatibility');
      expect(response.body.compatibility).toHaveProperty('environmentModels');
      expect(response.body.compatibility).toHaveProperty('virtualECUs');
      expect(response.body.compatibility).toHaveProperty('plantModels');
    });
  });

  describe('GET /api/plant-models/:id/versions', () => {
    it('should return version history', async () => {
      const response = await request(app)
        .get('/api/plant-models/PM-L9C8XYZ-A1B2C/versions')
        .expect(200);
      
      expect(response.body).toHaveProperty('currentVersion');
      expect(response.body).toHaveProperty('versionHistory');
      expect(Array.isArray(response.body.versionHistory)).toBe(true);
    });
  });

  describe('POST /api/plant-models', () => {
    it('should create a new plant model', async () => {
      const newModel = {
        name: 'Test Plant Model',
        description: 'Test description',
        type: 'Plant Simulation',
        version: '1.0.0'
      };

      const response = await request(app)
        .post('/api/plant-models')
        .send(newModel)
        .expect(201);
      
      expect(response.body).toHaveProperty('model');
      expect(response.body.model).toHaveProperty('id');
      expect(response.body.model.name).toBe(newModel.name);
      expect(response.body.model.metadata).toBeDefined();
    });
  });

  describe('PUT /api/plant-models/:id', () => {
    it('should update a model and create new version', async () => {
      const updates = {
        description: 'Updated description',
        changeDescription: 'Updated for testing'
      };

      const response = await request(app)
        .put('/api/plant-models/PM-L9C8XYZ-A1B2C')
        .send(updates)
        .expect(200);
      
      expect(response.body).toHaveProperty('model');
      expect(response.body.model.description).toBe(updates.description);
      expect(response.body.model.versionHistory.length).toBeGreaterThan(0);
    });
  });
});

describe('PlantModel Class', () => {
  it('should create a new PlantModel instance', () => {
    const data = {
      name: 'Test Model',
      description: 'Test Description',
      version: '1.0.0'
    };

    const model = new PlantModel(data);
    
    expect(model.name).toBe(data.name);
    expect(model.description).toBe(data.description);
    expect(model.version).toBe(data.version);
    expect(model.metadata).toBeDefined();
  });

  it('should create a new version correctly', () => {
    const model = new PlantModel({
      name: 'Test Model',
      version: '1.0.0'
    });

    const newVersion = model.createNewVersion({
      description: 'Updated',
      changeDescription: 'Test update'
    });

    expect(newVersion.version).toBe('1.0.1');
    expect(newVersion.parentVersion).toBe('1.0.0');
    expect(newVersion.versionHistory.length).toBe(1);
  });

  it('should increment version correctly', () => {
    const model = new PlantModel({ version: '1.2.3' });
    const newVersion = model.incrementVersion();
    expect(newVersion).toBe('1.2.4');
  });
});

describe('Metadata Extractor Service', () => {
  it('should detect source tool from file extension', () => {
    expect(metadataExtractor.detectSourceTool('model.spp', '')).toBe('Plant Simulation');
    expect(metadataExtractor.detectSourceTool('model.mdl', '')).toBe('Process Simulator');
    expect(metadataExtractor.detectSourceTool('model.mat', '')).toBe('MATLAB/Simulink');
    expect(metadataExtractor.detectSourceTool('model.unknown', '')).toBe('Unknown Tool');
  });

  it('should calculate compatibility percentages', () => {
    const compatibility = metadataExtractor.calculateCompatibility('', 'test.spp');
    
    expect(compatibility).toHaveProperty('environmentModels');
    expect(compatibility).toHaveProperty('virtualECUs');
    expect(compatibility).toHaveProperty('plantModels');
    expect(compatibility.environmentModels).toBeGreaterThanOrEqual(0);
    expect(compatibility.environmentModels).toBeLessThanOrEqual(100);
  });

  it('should return default metadata on error', () => {
    const defaultMetadata = metadataExtractor.getDefaultMetadata();
    
    expect(defaultMetadata).toHaveProperty('author');
    expect(defaultMetadata).toHaveProperty('modifiedDate');
    expect(defaultMetadata).toHaveProperty('sourceTool');
    expect(defaultMetadata).toHaveProperty('interfaces');
    expect(defaultMetadata).toHaveProperty('compatibility');
  });
});

describe('Tool Integration Service', () => {
  it('should get all registered tools', () => {
    const tools = toolIntegration.getAllTools();
    
    expect(Array.isArray(tools)).toBe(true);
    expect(tools.length).toBeGreaterThan(0);
    tools.forEach(tool => {
      expect(tool).toHaveProperty('name');
      expect(tool).toHaveProperty('executable');
      expect(tool).toHaveProperty('supportedExtensions');
    });
  });

  it('should detect tool for file', () => {
    expect(toolIntegration.detectToolForFile('model.spp')).toBe('Plant Simulation');
    expect(toolIntegration.detectToolForFile('model.mat')).toBe('MATLAB/Simulink');
    expect(toolIntegration.detectToolForFile('model.unknown')).toBeNull();
  });

  it('should generate unique session IDs', () => {
    const id1 = toolIntegration.generateSessionId();
    const id2 = toolIntegration.generateSessionId();
    
    expect(id1).not.toBe(id2);
    expect(id1).toContain('session_');
  });
});

describe('ID Generator Utility', () => {
  it('should generate unique numeric IDs', () => {
    const id1 = idGenerator.generateNumericId();
    const id2 = idGenerator.generateNumericId();
    
    expect(id1).not.toBe(id2);
    expect(typeof id1).toBe('number');
  });

  it('should generate UUID format IDs', () => {
    const uuid = idGenerator.generateUUID();
    
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('should generate model IDs with prefix', () => {
    const modelId = idGenerator.generateModelId('PM');
    
    expect(modelId).toContain('PM-');
    expect(modelId.length).toBeGreaterThan(10);
  });
});
