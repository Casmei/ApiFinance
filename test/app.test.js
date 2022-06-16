const request = require('supertest');

const app = require('../src/app');

test('Deve verificar se o servidor está rodando', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200);
})
