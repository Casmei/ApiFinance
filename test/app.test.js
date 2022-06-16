const request = require('supertest');

const app = require('../src/app');

test('Deve verificar se o servidor está rodando', () => {
    return request(app)
        .get('/')
        .then(res => expect(res.status).toBe(200));
})
