const request = require('supertest');

const app = require('../src/app');

test('Deve listar todos os usuários', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('name', 'Jhon Doe');
});

test('Deve criar um novo usuário', async () => {
    const response = await request(app).post('/users')
        .send({ name: 'Walter Mitty', mail: 'walter@mail.com' })

    expect(response.status).toBe(201);
    expect(res.body.name).toBe('Walter Mitty');

})
