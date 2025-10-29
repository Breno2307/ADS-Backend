const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "eu" && password === "41526378") {
    const payload = {
      email: username,
      nome: "eu2",
    };
    try {
      return res.json({ token: auth.gerarToken(payload) });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  return res.status(401).json({ msg: "credenciais invalidas" });
});

module.exports = router;
