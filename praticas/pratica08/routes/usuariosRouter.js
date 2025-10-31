const express = require('express');
const { gerarToken, verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario && senha) {
        try {
            const token = gerarToken({ email: usuario });
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    } else {
        return res.status(400).json({ msg: 'Usuário e senha são obrigatórios' });
    }
});

router.post('/renovar', verificarToken, (req, res) => {
    try {
        const token = gerarToken({ email: req.usuario.email });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ msg: 'Erro interno do servidor' });
    }
});

module.exports = router;