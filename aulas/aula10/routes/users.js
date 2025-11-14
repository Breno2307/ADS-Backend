const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const usuarioModel = require("../models/usuarioModel");

router.post("/", (req, res) => {
  const { password } = req.body;
  usuarioModel.create({ usuario: username, senha: bcrypt.hash(password) });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  usuarioModel.findOne({usuario: username, senha: bcrypt.hash(password)})

  
    const payload = {
      iss: "Minha API",
      aud: "vocÊ",
      email: username,
      nome: "eu2",
    };
    try {
      return res.json({ token: auth.gerarToken(payload) });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  
  return res.status(401).json({ msg: "credenciais invalidas" });
});

router.post("/renovar", auth.verificarToken, auth.renovarToken);

module.exports = router;
