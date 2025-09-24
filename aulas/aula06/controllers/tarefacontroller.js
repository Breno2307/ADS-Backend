const model = require("../models/tarefaModel");

const listarTarefas = (req, res) => {
  res.json(model.listar);
};

const criarTarefa = (req, res) => {
  const novaTarefa = model.criar(req.body);
  res.status(201).json(novaTarefa);
};

const buscarTarefa = (req, res, next) => {
  const { id } = req.params;
  const tarefaEncontrada = model.obter(id);
  if (tarefaEncontrada) return next();
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

const obterTarefa = (req, res) => {
  const { id } = req.params;
  const tarefaEncontrada = model.obter(id);
  res.json(tarefaEncontrada);
};

const atualizarTarefa = (req, res) => {
  const { id } = req.params;
  const tarefaEncontrada = model.atualizar({ id, ...req.body });
  res.json(tarefaEncontrada);
};

const apagarTarefa = (req, res) => {
  const { id } = req.params;
  model.remover(id);
  res.status(204).end();
};

module.exports = {
  listarTarefas,
  criarTarefa,
  obterTarefa,
  atualizarTarefa,
  apagarTarefa,
  buscarTarefa,
};
