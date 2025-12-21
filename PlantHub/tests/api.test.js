const request = require('supertest');
const app = require('../backend/server');

describe('PlantHub API Tests', () => {
  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('service', 'PlantHub API');
    });
  });

  describe('Tools API', () => {
    it('should return list of tools', async () => {
      const response = await request(app).get('/api/tools');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return specific tool by id', async () => {
      const response = await request(app).get('/api/tools/simulink');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 'simulink');
      expect(response.body).toHaveProperty('name');
    });

    it('should return 404 for non-existent tool', async () => {
      const response = await request(app).get('/api/tools/nonexistent');
      expect(response.status).toBe(404);
    });
  });

  describe('Models API', () => {
    it('should return list of models', async () => {
      const response = await request(app).get('/api/models');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter models by type', async () => {
      const response = await request(app).get('/api/models?type=sensor');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach(model => {
        expect(model.type).toBe('sensor');
      });
    });

    it('should create new model', async () => {
      const newModel = {
        name: 'Test Sensor',
        type: 'sensor',
        tool: 'simulink',
        version: '1.0',
        description: 'Test sensor model',
        tags: ['test', 'sensor']
      };
      const response = await request(app)
        .post('/api/models')
        .send(newModel);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Sensor');
    });
  });

  describe('Sharing API', () => {
    it('should return list of sharing records', async () => {
      const response = await request(app).get('/api/sharing');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return internal access records', async () => {
      const response = await request(app).get('/api/sharing/internal');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should create new sharing record', async () => {
      const newShare = {
        modelId: 'model-001',
        sharedWith: 'Test Partner',
        type: 'oem',
        permissions: ['read'],
        expiryDate: '2024-12-31'
      };
      const response = await request(app)
        .post('/api/sharing')
        .send(newShare);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.sharedWith).toBe('Test Partner');
    });
  });
});
