/**
 * Basic API tests for EnviHub
 * These tests verify the core API functionality
 */

const request = require('supertest');
const app = require('../backend/server');

describe('EnviHub API Tests', () => {
  
  // Health Check
  describe('GET /api/health', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
      expect(response.body.service).toBe('EnviHub API');
    });
  });

  // Tools API
  describe('Tools API', () => {
    it('should get all tools', async () => {
      const response = await request(app).get('/api/tools');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a specific tool', async () => {
      const response = await request(app).get('/api/tools/carmaker');
      expect(response.status).toBe(200);
      expect(response.body.id).toBe('carmaker');
      expect(response.body.name).toBe('IPG CarMaker');
    });

    it('should return 404 for non-existent tool', async () => {
      const response = await request(app).get('/api/tools/nonexistent');
      expect(response.status).toBe(404);
    });
  });

  // Models API
  describe('Models API', () => {
    it('should get all models', async () => {
      const response = await request(app).get('/api/models');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter models by tool', async () => {
      const response = await request(app).get('/api/models?tool=carmaker');
      expect(response.status).toBe(200);
      expect(response.body.every(m => m.tool === 'carmaker')).toBe(true);
    });

    it('should get a specific model', async () => {
      const response = await request(app).get('/api/models/model-001');
      expect(response.status).toBe(200);
      expect(response.body.id).toBe('model-001');
    });

    it('should create a new model', async () => {
      const newModel = {
        name: 'Test Model',
        type: 'test-type',
        tool: 'carmaker',
        version: '1.0',
        author: 'Test Author',
        description: 'Test description',
        tags: ['test'],
        parameters: {}
      };
      
      const response = await request(app)
        .post('/api/models')
        .send(newModel);
      
      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Test Model');
      expect(response.body.id).toBeDefined();
    });
  });

  // Sharing API
  describe('Sharing API', () => {
    it('should get all sharing records', async () => {
      const response = await request(app).get('/api/sharing');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get internal access records', async () => {
      const response = await request(app).get('/api/sharing/internal');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
