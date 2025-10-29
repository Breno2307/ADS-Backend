const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", auth.verificarToken, function (req, res, next) {
  res.json("api está on");
});

module.exports = router;
