const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Rota para criar um novo produto
router.post('/produtos', (req, res) => {
    try {
        const { nome, preco, estoque, slug } = req.body;
        const novoProduto = new Produto(nome, preco, estoque, slug);
        if (typeof Produto.salvarNovo === 'function') {
            Produto.salvarNovo(novoProduto);
        }
        res.status(201).json({ mensagem: 'Produto criado com sucesso', produto: novoProduto });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para listar todos os produtos
router.get('/produtos', (req, res) => {
    try {
        const produtos = typeof Produto.lerTodos === 'function' ? Produto.lerTodos() : [];
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao ler os produtos' });
    } 
});

module.exports = router;
module.exports = Produto;   