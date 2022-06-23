const { PrismaClient } = require('@prisma/client');
const request = require('supertest');
const app = require('../app');
const service = require('../src/service/UserService');

const prisma = new PrismaClient();
const mainRoute = '/account';
let user;

generateCode = (n = 3) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

let email = generateCode() + "@test.com";
let password = generateCode(6);

beforeAll(async () => {
    const res = await service.createUser({ name: 'Pedro Gomes', email, password });
    user = res;
});

test.skip('Deve responder no end-point raiz de account', () => {
    request(app).get(mainRoute)
        .then(() => {
            expect(res.status).toBe(200);
        })
})

test('Deve inserir uma conta com sucesso', async () => {
    const res = await request(app).post(mainRoute)
        .send({ name: '#Acc 1', user_id: user.id });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('#Acc 1');
})

test('Deve listar todas as contas', async () => {
    await prisma.account
        .create({
            data: {
                name: 'Acc List',
                userId: user.id
            }
        });
    const res = await request(app).get(mainRoute);
    expect(res.status).toBe(200);
});
