// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const Produto = require('../models/produto'); // Importamos nossa Classe-Modelo


router.post('/produtos', (req, res) => {
   const {id, nome, preco, estoque, slug} = req.body;
   try {
     const novoProduto = new Produto(id, nome, preco, estoque, slug);
           Produto.salvarNovo(novoProduto);
           res.status(201).json({ //(Status 201 = Created)
           mensagem: "Produto criado com sucesso!",
           produto: novoProduto });
   } catch (error) {
       res.status(400).json({ erro: error.message }); }
});


router.get('/produtos', (req, res) => {
   try { // A rota não precisa saber LER ARQUIVOS. Ela só pede os dados.
       const produtos = Produto.lerTodos();
       res.status(200).json(produtos);
   } catch (error) {
       res.status(500).json({ erro: "Erro." }); }
});

router.get('/produtos/:id', (req,res)=>{
    console.log(req.params.id);
    const ProdutoFiltrado = Produto.exibeViaId(req.params.id);
    if(ProdutoFiltrado){
        res.status(200).json(ProdutoFiltrado);
    }else{
        res.status(404);
    }
});
router.delete('/produtos/:id', (req,res)=>{
    try{
       Produto.excluirProduto(req.params.id) 
       res.status(200).send("Sucesso produto excluido!");
    }catch (error){
        res.status(400).send(error.message);
    }
});
module.exports = router;
