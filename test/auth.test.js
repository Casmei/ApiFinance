const request = require("supertest");
const app = require("../app");
const service = require('../src/service/UserService');

test('Deve receber token ao logar', async () => {
    const email = `${Date.now()}@auth.com`;
    return service.createUser(
        { name: 'Tiago de Castro Lima', email, password: '123456' })
        .then(() => request(app).post('/auth/singin')
            .send({ email, password: '123456' }))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        })
})
