//importa o framework
const express = require("express");

//cria uma instancia de aplicação
const app = express();

//middleware de aplicação
app.use((req, res, next) => {
  console.log("passei aqui");
  next();
});

//middleware de rota
const router = express.Router();

router.get("/", (req, res) => {
  res.send("chegou aqui");
});

router.post("/", (req, res) => {
  res.status(201).send("iserido com sucesso");
});

router.get("/:id", (req, res) => {
  const { id } = req.params; // {id:1, params2:5,params3:6}
  if (id == 1) return res.send("achei");
  throw Error("não achei");
});

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
