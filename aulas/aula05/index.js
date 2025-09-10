//importa o framework
const express = require("express");

//impotar o middleware de  rota
const router = require("./routertarefa");

//importa middleware de terceiros
const cors = require("cors");

//cria uma instancia de aplicação
const app = express();

//midleware embutido ou integrado
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //?param1=valor&param2=valor2

//midleware de terceiros
app.use(cors());

//middleware de aplicação
app.use((req, res, next) => {
  console.log("passei aqui");
  next();
});

//middleware de rota

app.use("/tarefas", router);

//middleware de erro
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("algo de errado não está certo");
});

// inicia a aplicação
app.listen(3000, () => {
  console.log("app está on!");
});
