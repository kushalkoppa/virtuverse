const request = require('supertest');
const app = require('../backend/server');

describe('V-Orchestrator API Tests', () => {
  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'healthy');
      expect(res.body).toHaveProperty('service', 'V-Orchestrator API');
    });
  });

  describe('Cosimulation Middleware API', () => {
    it('should get all middleware', async () => {
      const res = await request(app).get('/api/cosimulation');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Interfaces API', () => {
    it('should get all interfaces', async () => {
      const res = await request(app).get('/api/interfaces');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Test Cases API', () => {
    it('should get all test cases', async () => {
      const res = await request(app).get('/api/testcases');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Integrations API', () => {
    it('should get all integrations', async () => {
      const res = await request(app).get('/api/integrations');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get integration stats', async () => {
      const res = await request(app).get('/api/integrations/stats/summary');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('totalPlatforms');
      expect(res.body).toHaveProperty('totalModels');
    });
  });
});
