const request = require("supertest");

const app = require("../app");

test("Deve listar todos os usuários", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("name", "Jonh Doe");

});

test("Deve criar um novo usuário", async () => {
    const res = await request(app).post("/users")
        .send({ name: "Tiago de Castro", email: "a@mail.com" });

    expect(res.status).toBe(201);
    //expect(res.body.name).toBe("Tiago de Castro Lima");


});
