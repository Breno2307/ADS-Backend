const express = require("express");

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true },
];

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const agora = new Date().toISOString();
  console.log(`[${agora}] ${req.method} ${req.url}`);
  next();
});

const router = express.Router();

router.get("/", (req, res) => {
  res.json(tarefas);
});

router.post("/", (req, res) => {
  const novaTarefa = req.body;

  const novoId =
    tarefas.length > 0 ? Math.max(...tarefas.map((t) => t.id)) + 1 : 1;

  const tarefaCriada = {
    id: novoId,
    nome: novaTarefa.nome,
    concluida: novaTarefa.concluida || false,
  };

  tarefas.push(tarefaCriada);

  res.status(201).json(tarefaCriada);
});

function encontrarTarefa(id) {
  return tarefas.find((t) => t.id === id);
}

router.get("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId, 10);
  const tarefa = encontrarTarefa(id);
  if (!tarefa) {
    return next(new Error("Tarefa não localizada"));
  }
  res.json(tarefa);
});

router.put("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId, 10);
  const tarefa = encontrarTarefa(id);
  if (!tarefa) {
    return next(new Error("Tarefa não localizada"));
  }

  const dadosAtualizados = req.body;

  tarefa.nome =
    dadosAtualizados.nome !== undefined ? dadosAtualizados.nome : tarefa.nome;
  tarefa.concluida =
    dadosAtualizados.concluida !== undefined
      ? dadosAtualizados.concluida
      : tarefa.concluida;

  res.json(tarefa);
});

router.delete("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId, 10);
  const index = tarefas.findIndex((t) => t.id === id);
  if (index === -1) {
    return next(new Error("Tarefa não localizada"));
  }

  tarefas.splice(index, 1);
  res.status(204).send();
});

app.use("/tarefas", router);

app.use((err, req, res, next) => {
  res.status(400).json({ erro: err.message });
});

app.listen(3000, () => {
  console.log("api está on");
});

module.exports = app;
