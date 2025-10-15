const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let url = "/tarefas";

let id = null;

describe("testes do recurso /tarefas", () => {

  test("Post / deve retornar 201", async () => {
    const response = await request.post(url).send({ nome: "estudar" });
    expect(response.status).toBe(201);
    id = response.body.id;
  });

  test("GET / deve retornar 200", async () => {
    const response = await request.get(url)
    expect(response.status).toBe(200);
  });

  test("GET /id deve retornar 200", async () => {
    const response = await request.get(`${url}/${id}`);
    expect(response.status).toBe(200);
  });

  test("PUT /id deve retornar 200", async () => {
    const response = await request.put(`${url}/${id}`).send({
      nome: "estudar express",
      concluida: true,
    });
    expect(response.status).toBe(200);
  });

  test("DELETE /id deve retornar 204", async () => {
    const response = await request.delete(`${url}/${id}`);
    expect(response.status).toBe(204);
  });
});
