const supertest = require("supertest");

const app = require("../app");

const request = supertest(app);

let tarefaId;

describe("Testes da API de Tarefas", () => {
  test("GET /tarefas deve retornar status 200 e JSON", async () => {
    const response = await request
      .get("/tarefas")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /tarefas deve retornar status 201 e JSON", async () => {
    const novaTarefa = {
      nome: "Estudar Node",
      concluida: false,
    };
    const response = await request
      .post("/tarefas")
      .send(novaTarefa)
      .expect(201)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("nome", "Estudar Node");
    expect(response.body).toHaveProperty("concluida", false);
    tarefaId = response.body.id;
  });

  test("GET /tarefas/:id deve retornar status 200 e JSON para tarefa existente", async () => {
    const response = await request
      .get(`/tarefas/${tarefaId}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveProperty("id", tarefaId);
    expect(response.body).toHaveProperty("nome", "Estudar Node");
    expect(response.body).toHaveProperty("concluida", false);
  });

  test("GET /tarefas/1 deve retornar status 404 e JSON", async () => {
    const response = await request
      .get("/tarefas/1")
      .expect(404)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveProperty("msg", "Tarefa não encontrada");
  });

  test("PUT /tarefas/:id deve retornar status 200 e JSON para tarefa existente", async () => {
    const tarefaAtualizada = {
      nome: "Estudar Node e Express",
      concluida: true,
    };

    const response = await request
      .put(`/tarefas/${tarefaId}`)
      .send(tarefaAtualizada)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveProperty("id", tarefaId);
    expect(response.body).toHaveProperty("nome", "Estudar Node e Express");
    expect(response.body).toHaveProperty("concluida", true);
  });

  test("PUT /tarefas/1 deve retornar status 404 e JSON", async () => {
    const tarefaAtualizada = {
      nome: "Tarefa Inexistente",
      concluida: true,
    };

    const response = await request
      .put("/tarefas/1")
      .send(tarefaAtualizada)
      .expect(404)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveProperty("msg", "Tarefa não encontrada");
  });

  test("DELETE /tarefas/:id deve retornar status 204 sem conteúdo", async () => {
    await request
      .delete(`/tarefas/${tarefaId}`)
      .expect(204)
      .expect((res) => {
        expect(res.body).toEqual({});
      });
  });

  test("DELETE /tarefas/1 deve retornar status 404 e JSON", async () => {
    const response = await request
      .delete("/tarefas/1")
      .expect(404)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveProperty("msg", "Tarefa não encontrada");
  });
});
