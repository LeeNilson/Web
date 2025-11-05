const express = require('express');
const router = express.Router();
const Produto = require('../models/produto'); // Importamos nossa Classe-Modelo

router.get('/produtos', (req, res) => {
       //console.log("oi");
       const produtos = Produto.lerTodos();
        res.render('catalogo', {
        // As chaves viram variáveis DENTRO do .ejs
            tituloDaPagina: "Catálogo de Produtos",
            listaDeProdutos: produtos 
        });
});

router.post('/produtos', (req, res) => {
const {id, nome, preco, estoque, slug} = req.body;
    console.log(req.body);
     const novoProduto = new Produto(id, nome, +preco, estoque, slug);
           Produto.salvarNovo(novoProduto);
            res.render('catalogo', {
            // As chaves viram variáveis DENTRO do .ejs
                tituloDaPagina: "Produto registrado!",
                listaDeProdutos: novoProduto 
            });
   }); 
module.exports = router;