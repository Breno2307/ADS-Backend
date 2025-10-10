const Tarefa  = require("./modelo.js");

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome, false);

  await tarefa.init();
  await tarefa.inserir();

  return tarefa;
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome, false);

  await tarefa.init();
  await tarefa.buscar();

  return tarefa;
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome, false);

  await tarefa.init();
  const encontrada = await tarefa.buscar();

  if (encontrada) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;

    await tarefa.alterar();
    return true;
  }

  return false;
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome, false);

  await tarefa.init();
  const encontrada = await tarefa.buscar();

  if (encontrada) {
    await tarefa.deletar();
    return true;
  }

  return false;
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa,
};
