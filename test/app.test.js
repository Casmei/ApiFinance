const request = require('supertest');

const app = require('../app')

test('Deve responder no end-point raiz', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
})
