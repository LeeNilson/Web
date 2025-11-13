// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const Produto = require('../models/produto'); // Importamos nossa Classe-Modelo
const produtoController = require('../controllers/produtoController')
const {authenticateToken, authorizeRole}= require('../middleware/auth')

router.post('/produtos', produtoController.criarProduto);
router.get('/produtos', produtoController.listarProdutos);
router.get('/produtos/:id', produtoController.exibirProdutoPorId);
router.delete('/produtos/:id',
     [authenticateToken, authorizeRole('admin')], 
    produtoController.excluirProduto);
module.exports = router;
