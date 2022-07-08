const { PrismaClient } = require('@prisma/client');
const request = require('supertest');
const app = require('../app');
const service = require('../src/service/UserService');
const jwt = require('jwt-simple');


const prisma = new PrismaClient();
const mainRoute = '/account';
let user;

let email = Date.now() + "@test.com";
let password = '123456';

beforeAll(async () => {
    const res = await service.createUser({ name: 'Pedro Gomes', email, password });
    user = res;
    user.token = jwt.encode(user, process.env.SECRET_KEY)
});

test('Deve inserir uma conta com sucesso', async () => {
    const res = await request(app).post(mainRoute)
        .send({ name: '#Acc 1', user_id: user.id })
        .set('authorization', `bearer ${user.token}`)

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('#Acc 1');
});

test('Não deve inserir uma conta sem nome', async () => {
    const res = await request(app).post(mainRoute)
        .send({ user_id: user.id })
        .set('authorization', `bearer ${user.token}`)

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Nome é um atributo obrigatório');
});

test.skip('Não deve inserir uma conta de nome duplicado, para o mesmo usuário', async () => {

});

test('Deve listar todas as contas', async () => {
    await prisma.account
        .create({
            data: {
                name: 'Acc List',
                userId: user.id
            }
        });
    const res = await request(app).get(mainRoute)
        .set('authorization', `bearer ${user.token}`)

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});

test.skip('Deve listar apenas as contas do usuário', async () => {

});

test('Deve retornar uma conta por id', async () => {
    const account = await prisma.account
        .create({
            data: {
                name: 'Acc Id',
                userId: user.id
            }
        });

    const res = await request(app).get(`${mainRoute}/${account.id}`)
        .set('authorization', `bearer ${user.token}`)

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Acc Id");
    expect(res.body.userId).toBe(account.userId);
});

test.skip('Não deve retornar uma conta de outro usuário', async () => {
});

test('Deve alterar uma conta', async () => {
    const account = await prisma.account
        .create({
            data: {
                name: 'Acc Update',
                userId: user.id
            }
        });

    const res = await request(app).put(`${mainRoute}/${account.id}`)
        .send({ name: 'Acc Updated' })
        .set('authorization', `bearer ${user.token}`)

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Acc Updated");
});

test.skip('Não deve alterar uma conta de outro usuário', async () => {
});

test('Deve remover uma conta', async () => {
    const account = await prisma.account
        .create({
            data: {
                name: 'Acc Delete',
                userId: user.id
            }
        });
    const res = await request(app).delete(`${mainRoute}/${account.id}`)
        .send(account)
        .set('authorization', `bearer ${user.token}`)

    expect(res.status).toBe(204);
})

test.skip('Não deve remover uma conta de outro usuário', async () => {
});
