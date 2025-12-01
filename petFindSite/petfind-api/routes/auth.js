const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Registro de novo usuário
router.post('/registrar', async (req, res) => {
    try {
        const { nome, email, senha, telefone, celular, cidade, estado } = req.body;
        
        // Validação
        if (!nome || !email || !senha) {
            return res.status(400).json({
                success: false,
                message: 'Nome, email e senha são obrigatórios'
            });
        }
        
        // Verificar se email já existe
        const userExiste = await pool.query(
            'SELECT id FROM usuarios WHERE email = $1',
            [email]
        );
        
        if (userExiste.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email já cadastrado'
            });
        }
        
        // Hash da senha
        const senhaHash = await bcrypt.hash(senha, 10);
        
        // Inserir usuário
        const result = await pool.query(
            `INSERT INTO usuarios (nome, email, senha, telefone, celular, cidade, estado)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING id, nome, email`,
            [nome, email, senhaHash, telefone, celular, cidade, estado]
        );
        
        const usuario = result.rows[0];
        
        // Gerar token
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        
        res.status(201).json({
            success: true,
            message: 'Usuário cadastrado com sucesso!',
            data: {
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                },
                token
            }
        });
        
    } catch (error) {
        console.error('Erro ao registrar:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar usuário',
            error: error.message
        });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        if (!email || !senha) {
            return res.status(400).json({
                success: false,
                message: 'Email e senha são obrigatórios'
            });
        }
        
        // Buscar usuário
        const result = await pool.query(
            'SELECT id, nome, email, senha, ativo FROM usuarios WHERE email = $1',
            [email]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Email ou senha incorretos'
            });
        }
        
        const usuario = result.rows[0];
        
        // Verificar se está ativo
        if (!usuario.ativo) {
            return res.status(401).json({
                success: false,
                message: 'Usuário desativado'
            });
        }
        
        // Verificar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        
        if (!senhaValida) {
            return res.status(401).json({
                success: false,
                message: 'Email ou senha incorretos'
            });
        }
        
        // Atualizar último acesso
        await pool.query(
            'UPDATE usuarios SET ultimo_acesso = CURRENT_TIMESTAMP WHERE id = $1',
            [usuario.id]
        );
        
        // Gerar token
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        
        res.json({
            success: true,
            message: 'Login realizado com sucesso!',
            data: {
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                },
                token
            }
        });
        
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao fazer login',
            error: error.message
        });
    }
});

module.exports = router;