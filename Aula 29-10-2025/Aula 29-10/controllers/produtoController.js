const Produto = require('../models/produto');
const {validarDadosProduto} = require("../services/produtoService");

exports.criarProduto = (req, res) => {
   try {
     const produtoValido = validarDadosProduto(req.body);
     const novoProduto = new Produto(produtoValido);
     Produto.salvarNovo(novoProduto);
     res.status(201).json({ //(Status 201 = Created)
     mensagem: "Produto criado com sucesso!",
     produto: novoProduto });
   } catch (error) {
       res.status(400).json({ erro: error.message }); }
};      

exports.listarProdutos = (req, res) => {
   try { // A rota não precisa saber LER ARQUIVOS. Ela só pede os dados.
       const produtos = Produto.lerTodos();
       res.status(200).json(produtos);
   } catch (error) {
       res.status(500).json({ erro: "Erro." }); }
};

exports.exibirProdutoPorId = (req,res)=>{
    console.log(req.params.id);
    const ProdutoFiltrado = Produto.exibeViaId(req.params.id);
    if(ProdutoFiltrado){
        res.status(200).json(ProdutoFiltrado);
    }else{
        res.status(404);
    }
};

exports.excluirProduto = (req,res)=>{
    try{
       Produto.excluirProduto(req.params.id) 
       res.status(200).send("Sucesso produto excluido!");
    }catch (error){
        res.status(400).send(error.message);
    }
};

