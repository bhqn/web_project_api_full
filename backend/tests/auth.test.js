const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const request = supertest(app);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("teste de autenticacao", () => {
  test("Deve registrar um novo usuario", async () => {
    const response = await request.post("/signup").send({
      email: "jajajayddddd@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
  });

    test("Deve falhar no Login", async () => {
    const response = await request.post("/signin").send({
      email: "pedrosa@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(401);
    

  });

    test("Deve Logar com sucesso", async () => {
    const response = await request.post("/signin").send({
      email: "jajajaydd@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined()
  
  });

   
});


