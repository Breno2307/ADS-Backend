const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let url = "/tarefas";

let id = null;

describe("testes do recurso /tarefas", () => {
  test("Post / deve retornar 201", async () => {
    const response = await request.post(url).send({ nome: "estudar" });
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.nome).toBe("estudar");
    expect(response.body.concluida).toBe(false);
    id = response.body._id;
  });

  test("Post / deve retornar 422", async () => {
    const response = await request.post(url);
    expect(response.status).toBe(422);
   expect(response.body.msg).toBe("Nome da tarefa é obrigatorio");
  });

  test("GET / deve retornar 200", async () => {
    const response = await request.get(url);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /id deve retornar 200", async () => {
    const response = await request.get(`${url}/${id}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBeDefined();
    expect(response.body.nome).toBe("estudar");
    expect(response.body.concluida).toBe(false);
  });

  test("GET /id deve retornar 400", async () => {
    const response = await request.get(`${url}/0`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID Invalido");
  });

  test("GET /id deve retornar 404", async () => {
    const response = await request.get(`${url}/000000000000000000000000`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Tarefa não encontrada");
  });

  test("PUT /id deve retornar 200", async () => {
    const response = await request.put(`${url}/${id}`).send({
      nome: "estudar express",
      concluida: true,
    });
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("estudar express");
    expect(response.body.concluida).toBe(true);
  });

  test("PUT /id deve retornar 404", async () => {
    const response = await request.put(`${url}/000000000000000000000000`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Tarefa não encontrada");
  });
  test("PUT /id deve retornar 400", async () => {
    const response = await request.put(`${url}/0`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID Invalido");
  });

  test("DELETE /id deve retornar 204", async () => {
    const response = await request.delete(`${url}/${id}`);
    expect(response.status).toBe(204);
  });

  test("DELETE /id deve retornar 400", async () => {
    const response = await request.delete(`${url}/0`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID Invalido");
  });

  test("DELETE /id deve retornar 404", async () => {
    const response = await request.delete(`${url}/${id}`);
    expect(response.status).toBe(404);
  });

});
