const readline = require("readline-sync");

const controlador = require ("./controlador.js");

function menu() {
  console.log("\n=== MENU DE TAREFAS ===");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair");
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case "1":
      const nomeAdicionar = readline.question("Digite o nome da tarefa: ");
      await controlador.adicionarTarefa(nomeAdicionar);
      console.log("Tarefa adicionada com sucesso!");
      break;

    case "2":
      const nomeBuscar = readline.question("Digite o nome da tarefa: ");
      const tarefa = await controlador.buscarTarefa(nomeBuscar);
      if (tarefa.id) {
        console.log("\nTarefa encontrada:");
        console.log(`ID: ${tarefa.id}`);
        console.log(`Nome: ${tarefa.nome}`);
        console.log(`Concluída: ${tarefa.concluida ? "Sim" : "Não"}`);
      } else {
        console.log("Tarefa não encontrada!");
      }
      break;

    case "3":
      const nomeAtualizar = readline.question("Digite o nome da tarefa: ");
      const concluidaStr = readline.question("Está concluída? (s/n): ");
      const concluida = concluidaStr.toLowerCase() === "s";
      const sucesso = await controlador.atualizarTarefa(
        nomeAtualizar,
        concluida
      );
      if (sucesso) {
        console.log("Tarefa atualizada com sucesso!");
      } else {
        console.log("Tarefa não encontrada!");
      }
      break;

    case "4":
      const nomeRemover = readline.question("Digite o nome da tarefa: ");
      const removida = await controlador.removerTarefa(nomeRemover);
      if (removida) {
        console.log("Tarefa removida com sucesso!");
      } else {
        console.log("Tarefa não encontrada!");
      }
      break;

    case "5":
      console.log("Saindo do sistema...");
      process.exit();
      break;

    default:
      console.log("Opção inválida!");
  }
}

async function main() {
  while (true) {
    menu();

    const opcao = readline.question("\nDigite a opcao desejada: ");
    await escolherOpcao(opcao);

    readline.question("Pressione Enter para continuar...");
  }
}

main().catch(console.error);
