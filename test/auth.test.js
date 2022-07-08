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
});

test('Não deve autenticar usuário com senha errada', () => {
    const email = `${Date.now()}@auth.com`;
    return service.createUser(
        { name: 'Tiago de Castro Lima', email, password: '123456' })
        .then(() => request(app).post('/auth/singin')
            .send({ email, password: '123124' }))
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe("Senha ou Usuário inválidos");
        })
})

test('Não deve autenticar usuário que não existe', async () => {
    const email = `${Date.now()}@auth.com`;

    const res = await request(app).post('/auth/singin')
        .send({ email: "naoexiste@fodase.com", password: '123124' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Senha ou Usuário inválidos");
})
