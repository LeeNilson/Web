const express = require('express');
const router = express.Router();
const Produto = require('../models/produto');

// GET - Listar todos os produtos (JSON)
router.get('/api/produtos', (req, res) => {
    try {
        const produtos = Produto.lerTodos();
        res.json({
            sucesso: true,
            dados: produtos,
            total: produtos.length
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar produtos',
            erro: error.message
        });
    }
});

// GET - Buscar produto por ID (JSON)
router.get('/api/produtos/:id', (req, res) => {
    try {
        const { id } = req.params;
        const produto = Produto.buscarPorId(id);
        
        if (!produto) {
            return res.status(404).json({
                sucesso: false,
                mensagem: `Produto com ID ${id} não encontrado`
            });
        }
        
        res.json({
            sucesso: true,
            dados: produto
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar produto',
            erro: error.message
        });
    }
});

// GET - Buscar produto por slug (JSON)
router.get('/api/produtos/slug/:slug', (req, res) => {
    try {
        const { slug } = req.params;
        const produto = Produto.buscarPorSlug(slug);
        
        if (!produto) {
            return res.status(404).json({
                sucesso: false,
                mensagem: `Produto com slug '${slug}' não encontrado`
            });
        }
        
        res.json({
            sucesso: true,
            dados: produto
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar produto por slug',
            erro: error.message
        });
    }
});

// POST - Criar novo produto (JSON)
router.post('/api/produtos', (req, res) => {
    try {
        const { id, nome, preco, estoque, slug } = req.body;
        
        // Validação básica
        if (!id || !nome || !preco) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Campos obrigatórios: id, nome, preco'
            });
        }
        
        const novoProduto = new Produto(id, nome, +preco, estoque || 0, slug);
        Produto.salvarNovo(novoProduto);
        
        res.status(201).json({
            sucesso: true,
            mensagem: 'Produto criado com sucesso',
            dados: novoProduto
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao criar produto',
            erro: error.message
        });
    }
});

// DELETE - Excluir produto por ID (JSON)
router.delete('/api/produtos/:id', (req, res) => {
    try {
        const { id } = req.params;
        const sucesso = Produto.excluir(id);
        
        if (!sucesso) {
            return res.status(404).json({
                sucesso: false,
                mensagem: `Produto com ID ${id} não encontrado`
            });
        }
        
        res.json({
            sucesso: true,
            mensagem: `Produto ${id} excluído com sucesso`
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao excluir produto',
            erro: error.message
        });
    }
});

module.exports = router;