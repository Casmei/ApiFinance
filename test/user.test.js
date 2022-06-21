const request = require("supertest");
const app = require("../app");


generateCode = (n = 3) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

}

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
        .send({ name: "Tiago de Castro Lima", email: email, password: password });
    expect(res.status).toBe(201);
});
