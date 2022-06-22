const request = require('supertest');
const app = require('../app')
const service = require('../src/service/UserService')

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
    user = { ...res[0] };
});

test('Deve responder no end-point raiz de account', async () => {
    const res = await request(app).get('/account');
    expect(res.status).toBe(200);
})


test.skip('Deve inserir uma conta com sucesso', async () => {
    const res = await request(app).post(mainRoute)
        .send({ name: '#Acc 1', user_id: user.id })
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('#Acc 1');
})
