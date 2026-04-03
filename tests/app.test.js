const request = require('supertest');
const app = require('../app');

describe('Express App Tests', () => {
  
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Welcome to Jenkins Demo App');
      expect(res.body).toHaveProperty('version');
      expect(res.body).toHaveProperty('environment');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('healthy');
    });
  });

  describe('GET /info', () => {
    it('should return application info', async () => {
      const res = await request(app).get('/info');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('app_name');
      expect(res.body).toHaveProperty('version');
      expect(res.body).toHaveProperty('node_version');
    });
  });

  describe('GET /metrics', () => {
    it('should return metrics', async () => {
      const res = await request(app).get('/metrics');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('memory');
      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('pid');
    });
  });

  describe('404 Error', () => {
    it('should return 404 for undefined route', async () => {
      const res = await request(app).get('/nonexistent');
      expect(res.statusCode).toBe(404);
    });
  });
});
