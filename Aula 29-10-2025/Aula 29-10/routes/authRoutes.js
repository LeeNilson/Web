const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const JWT_SECRET = "minha-senha";

router.post('/login', async (req, res)=>{
    try {
        const {email, senha} = req.body;
        if(!email || !senha){
            return res.status(400).json({ erro: "Email e senha obrigatório"})
        }
        const usuario = Usuario.BuscaPorEmail(email);
        if(!usuario){
            return res.status(401).json({
                erro:"Email inválido"
            })
        }
        const SenhaCorreta = 
        await bcrypt.compare(senha, usuario.senhaHash)
        if(!SenhaCorreta) {
            return res.status(401).json({
                erro: "Senha incorreta"
            })
        }
        const payload = {
            id: usuario.id,
            email: usuario.email,
            role: usuario.role
        }
        const token = jwt.sign(payload, 
            JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({
            mensagem:"Login sucesso!",
            token: token
        })
    }catch(e){
        res.status(500).json({
            erro: "Erro interno do servidor",
            e: e
        })
    }
})
module.exports = router; 