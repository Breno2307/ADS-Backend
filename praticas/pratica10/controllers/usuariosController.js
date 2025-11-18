const { cifrarSenha, compararSenha, gerarToken } = require('../middlewares/authMiddleware');
const usuariosModel = require('../models/usuariosModel');

async function criar(req, res) {
  try {
    const senhaCifrada = cifrarSenha(req.body.senha);
    
    const novoUsuario = await usuariosModel.create({
      email: req.body.email,
      senha: senhaCifrada
    });
    
    return res.status(201).json({
      _id: novoUsuario._id,
      email: novoUsuario.email
    });
  } catch (error) {
    return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
  }
}

async function entrar(req, res) {
  try {
    const usuarioEncontrado = await usuariosModel.findOne({ 
      email: req.body.usuario 
    });

    if (usuarioEncontrado && compararSenha(req.body.senha, usuarioEncontrado.senha)) {
      const token = gerarToken({ email: req.body.usuario });
      return res.status(200).json({ token });
    }
    
    return res.status(401).json({ msg: 'Credenciais inválidas' });
  } catch (error) {
    return res.status(401).json({ msg: 'Credenciais inválidas' });
  }
}

async function renovar(req, res) {
  try {
    const token = gerarToken({ email: req.usuario });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}

async function remover(req, res) {
  try {
    // Passo 9c: Remover usuário
    await usuariosModel.findOneAndDelete({ email: req.body.usuario });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao remover usuário' });
  }
}

module.exports = {
  criar,
  entrar,
  renovar,
  remover
};