const express = require('express');
const router = express.Router();
const Produto = require('../models/produto');

// GET - Listar todos os produtos (HTML)
router.get('/produtos', (req, res) => {
    try {
        const produtos = Produto.lerTodos();
        res.render('catalogo', {
            tituloDaPagina: "Catálogo de Produtos",
            listaDeProdutos: produtos 
        });
    } catch (error) {
        res.status(500).send('Erro ao carregar produtos');
    }
});

// GET - Detalhes do produto por ID (HTML)
router.get('/produtos/:id', (req, res) => {
    try {
        const { id } = req.params;
        const produto = Produto.buscarPorId(id);
        
        if (!produto) {
            return res.status(404).render('erro', {
                tituloDaPagina: "Produto não encontrado",
                mensagem: `Produto com ID ${id} não foi encontrado.`
            });
        }
        
        res.render('produto-detalhes', {
            tituloDaPagina: `Detalhes - ${produto.nome}`,
            produto: produto
        });
    } catch (error) {
        res.status(500).send('Erro ao carregar produto');
    }
});

// GET - Buscar produto por slug (HTML)
router.get('/produtos/slug/:slug', (req, res) => {
    try {
        const { slug } = req.params;
        const produto = Produto.buscarPorSlug(slug);
        
        if (!produto) {
            return res.status(404).render('erro', {
                tituloDaPagina: "Produto não encontrado",
                mensagem: `Produto com slug '${slug}' não foi encontrado.`
            });
        }
        
        res.render('produto-detalhes', {
            tituloDaPagina: `Detalhes - ${produto.nome}`,
            produto: produto
        });
    } catch (error) {
        res.status(500).send('Erro ao carregar produto');
    }
});

// POST - Criar novo produto (HTML)
router.post('/produtos', (req, res) => {
    try {
        const { id, nome, preco, estoque, slug } = req.body;
        const novoProduto = new Produto(id, nome, +preco, estoque || 0, slug);
        Produto.salvarNovo(novoProduto);
        
        res.redirect('/produtos');
    } catch (error) {
        res.status(500).send('Erro ao criar produto');
    }
});

// POST - Excluir produto (HTML - usando POST porque formulários HTML não suportam DELETE)
router.post('/produtos/:id/excluir', (req, res) => {
    try {
        const { id } = req.params;
        const sucesso = Produto.excluir(id);
        
        if (!sucesso) {
            return res.status(404).send('Produto não encontrado');
        }
        
        res.redirect('/produtos');
    } catch (error) {
        res.status(500).send('Erro ao excluir produto');
    }
});

module.exports = router;