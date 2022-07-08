const request = require("supertest");
const jwt = require('jwt-simple');

const app = require("../app");
const service = require('../src/service/UserService');


let user;
let email = Date.now() + "@test.com";
let password = '123456';

beforeAll(async () => {
    const res = await service.createUser({ name: 'Pedro Gomes', email, password });
    user = res;
    user.token = jwt.encode(user, process.env.SECRET_KEY)
});

test("Não deve inserir usuário sem nome", async () => {
    const res = await request(app).post('/users')
        .set('authorization', `bearer ${user.token}`)
        .send({ email, password })

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Nome é um atributo obrigatório");
});

test("Deve listar todos os usuários", async () => {
    const res = await request(app).get("/users")
        .set('authorization', `bearer ${user.token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("name", "Tiago de Castro Lima");

});

test("Deve criar um novo usuário", async () => {
    const res = await request(app).post("/users")
        .send({ name: "Tiago de Castro Lima", email: `${Date.now()} + @algumacoisa.com`, password })
        .set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(201);
    expect(res.body).not.toHaveProperty('password');
});


test('Deve armazenar senha criptografada', async () => {
    const res = await request(app).post('/users')
        .set('authorization', `bearer ${user.token}`)
        .send({ name: 'Pedro Gomes', email: `${Date.now()}@algumacoisa.com`, password: '123456' })

    const { id } = res.body;
    const userFind = await service.findOne({ id: id });
    expect(res.status).toBe(201);
    expect(userFind.password).not.toBe('123456');
    expect(userFind.password).not.toBeUndefined();
})


test("Não deve inserir usuário sem email", async () => {
    const res = await request(app).post('/users')
        .send({ name: "Tiago de Castro Lima", password })
        .set('authorization', `bearer ${user.token}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email é um atributo obrigatório");
});

test("Não deve inserir usuário sem senha", async () => {
    const res = await request(app).post('/users')
        .send({ name: "Tiago de Castro Lima", email })
        .set('authorization', `bearer ${user.token}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Senha é um atributo obrigatório");
});

test("Não deve inserir usuário com email existente", async () => {
    const res = await request(app).post('/users')
        .send({ name: "Tiago de Castro Lima", email, password })
        .set('authorization', `bearer ${user.token}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Já existe um usuário com este email");
})
