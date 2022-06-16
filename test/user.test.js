const request = require('supertest');

const app = require('../src/app');

test('Deve listar todos os usuários', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('name', 'Jhon Doe');
});

