const express = require('express');
const router = express.Router();
const Produto = require('../models/produto');

// Rota para listar todos os produtos
router.get('/produtos', (req, res) => {
    const produtos = Produto.lerTodos();
    res.render('catalogo', {
        tituloDaPagina: "Catálogo de Produtos",
        listaDeProdutos: produtos 
    });
});

// NOVA ROTA: Detalhes do produto por ID (DEVE vir depois de /produtos)
router.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const produtos = Produto.lerTodos();
    
    // Busca o produto pelo ID
    const produto = produtos.find(p => p.id === id);
    
    if (!produto) {
        return res.status(404).send(`
            <h1>Erro 404</h1>
            <p>Produto com ID ${id} não foi encontrado.</p>
            <a href="/produtos">Voltar ao catálogo</a>
        `);
    }
    
    res.render('produto-detalhes', {
        tituloDaPagina: `Detalhes - ${produto.nome}`,
        produto: produto
    });
});

// Rota para criar novo produto
router.post('/produtos', (req, res) => {
    const {id, nome, preco, estoque, slug} = req.body;
    console.log(req.body);
    const novoProduto = new Produto(id, nome, +preco, estoque, slug);
    Produto.salvarNovo(novoProduto);
    
    res.render('catalogo', {
        tituloDaPagina: "Produto registrado!",
        listaDeProdutos: Produto.lerTodos() // CORRIGIDO
    });
}); 

module.exports = router;