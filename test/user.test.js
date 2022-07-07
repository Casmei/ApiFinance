const request = require("supertest");
const app = require("../app");


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

test("Deve listar todos os usuários", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("name", "Tiago de Castro Lima");

});

test("Deve criar um novo usuário", async () => {
    const res = await request(app).post("/users")
        .send({ name: "Tiago de Castro Lima", email, password });
    expect(res.status).toBe(201);
    expect(res.body).not.toHaveProperty('password');
});

test('Deve armazenar senha criptografada', async () => {
    let email = generateCode() + "@test.com";

    const res = await request(app).post('/users')
        .send({ name: 'Pedro Gomes', email, password: 123456 });

    const { id } = res.body;
    const user = await service.findOne({ id });
    expect(res.status).toBe(201);
    expect(user.password).not.toBe(password);
    expect(user.password).not.toBeUndefined();


})

test("Não deve inserir usuário sem nome", async () => {
    const res = await request(app).post('/users')
        .send({ email, password });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Nome é um atributo obrigatório");
});

test("Não deve inserir usuário sem email", async () => {
    const res = await request(app).post('/users')
        .send({ name: "Tiago de Castro Lima", password });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email é um atributo obrigatório");
});

test("Não deve inserir usuário sem senha", async () => {
    const res = await request(app).post('/users')
        .send({ name: "Tiago de Castro Lima", email });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Senha é um atributo obrigatório");
});

test("Não deve inserir usuário com email existente", async () => {
    const res = await request(app).post('/users')
        .send({ name: "Tiago de Castro Lima", email, password })
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Já existe um usuário com este email");
})
