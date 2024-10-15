process.env.NODE_ENV = 'test';
const conn = require('./db/index.js');
const request = require('supertest');
const app = require('./app.js');

describe('Testing routes for /reddit', () => {
  beforeAll(async () => {
    await conn.connect();
  });

  afterAll(async () => {
    await conn.close();
  });

  it('GET when db has no tasks', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.body.tasks).toEqual([]);
  });

  it('POST when db has no tasks', async () => {
    const mytask = {text: 'Test Text'};
    const res = await request(app).post('/api/posts')
      .send(mytask)
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json');
    expect(res.status).toBe(201);
    expect(res.body.task.text).toBe(mytask.text);
  });

  it('GET after adding one task', async () => {
    const res = await request(app).get('/api/posts')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json');
    expect(res.body.tasks[0].text).toBe('Test Text');
  });
  it('Test DropDB', async () => {
    const res = await request(app).delete('/api/DropDB')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json');
    expect(res.status).toBe(201);
  });
  it('GET after dropping db', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.body.tasks).toEqual([]);
  });
  it('POST with source on Empty DB', async () => {
    const mytask = {text: 'Test Text'};
    const res = await request(app).post('/api/posts')
      .send(mytask)
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json');
    expect(res.status).toBe(201);
    expect(res.body.task.text).toBe(mytask.text);
    expect(res.body.task.source).toBe('user');
  });
  it('Test Getting Reddit Data', async () => {
    const res = await request(app).post('/api/GetRedditData')
      .send({searchTerm: 'test', limit: 10, time: 'all'})
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json');
    expect(res.status).toBe(201);
  });
  it('Test Getting Youtube Data', async () => {
    const res = await request(app).get('/api/GetYoutubeData')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json');
    expect(res.status).toBe(201);
  });
  it('Test Getting Combined Data', async () => {
    const res = await request(app).post('/api/getPostData')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json');
    expect(res.status).toBe(201);
    expect(res.body.task).not.toBe([])
  });
});




