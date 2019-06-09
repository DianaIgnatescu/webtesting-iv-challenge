const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET /', () => {
    it('should return 200 OK when successful', async () => {
      const res = await request(server).get('/api');
      expect(res.status).toBe(200);
    });
    it('should return JSON', async () => {
      const res = await request(server).get('/api');
      expect(res.type).toBe('application/json');
    });
    it('should return { api: "up" }', async () => {
      const res = await request(server).get('/api');
      expect(res.body).toEqual({ api: 'up'});
    });
  });

  describe('GET, /api/friends', () => {
    it('should return 200 OK', async () => {
      const res = await request(server).get('/api/friends');
      expect(res.status).toBe(200);
    });
    it('should return the correct response object', async () => {
      const response = await request(server).get('/api/friends');
      expect(response.body).toEqual([{ id: 1, name: 'Monica' }]);
    });
    it('should return JSON', async () => {
      const res = await request(server).get('/api/friends');
      expect(res.type).toBe('application/json');
    });
  });

  describe('POST, /api/friends', () => {
    it('should return 201 Created when request successful', async () => {
      const body = { name: "Rachel" };
      const response = await request(server).post('/api/friends').send(body);

      expect(response.status).toBe(201);
    });
    it('should return 400 Bad Request when request unsuccessful', async () => {
      const body = { };
      const response = await request(server).post('/api/friends').send(body);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/friends', () => {
    it('should return 200 OK when request successful', async () => {
      const body = { name: "Rachel" };
      const response = await request(server).delete('/api/friends').send(body);

      expect(response.status).toBe(200);
    });
    it('should return 400 Bad Request when request unsuccessful', async () => {
      const body = { };
      const response = await request(server).delete('/api/friends').send(body);

      expect(response.status).toBe(400);
    });
    it('should return JSON', async () => {
      const res = await request(server).delete('/api/friends');
      expect(res.type).toBe('application/json');
    });
  })
});
