const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ msg: "Não autorizado" });
  }

  try {
    const tokenLimpo = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
}

function gerarToken(payload) {
  const expiresIn = 120; 
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw new Error("Erro ao gerar o token");
  }
}

module.exports = {
  verificarToken,
  gerarToken,
};
