const express = require('express');
const router = express.Router();
const Produto = require('../models/produto');

router.get('/produtos', (req, res) => {
    const produtos = Produto.lerTodos();
    res.render('catalogo', {
        tituloDaPagina: "Catálogo de Produtos",
        listaDeProdutos: produtos 
    });
});

// Nova rota para detalhes do produto por ID
router.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const produtos = Produto.lerTodos();
    
    // Busca o produto pelo ID
    const produto = produtos.find(p => p.id === id);
    
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
});

router.post('/produtos', (req, res) => {
    const {id, nome, preco, estoque, slug} = req.body;
    console.log(req.body);
    const novoProduto = new Produto(id, nome, +preco, estoque, slug);
    Produto.salvarNovo(novoProduto);
    
    res.render('catalogo', {
        tituloDaPagina: "Produto registrado!",
        listaDeProdutos: Produto.lerTodos() 
    });
}); 

module.exports = router;