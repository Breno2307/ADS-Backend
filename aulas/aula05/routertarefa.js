const express = require("express");

//middleware de rota
const router = express.Router();

router.get("/", (req, res) => {
  res.send("chegou aqui");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.status(201).send("iserido com sucesso");
});

router.get("/:id", (req, res) => {
  const { id } = req.params; // {id:1, params2:5,params3:6}
  if (id == 1) return res.send("achei");
  throw Error("não achei");
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (id == 1) return res.send("Tarefa alterada.");
  res.status(404).send("tarefa não encontrado");
});

router.delete("/:id", (req, res) => {
  res.status(204).end(); //sem corpo
});

module.exports = router;
