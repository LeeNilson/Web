const fs = require('fs');
// File System (nativo do Node)
const path = require('path');
// O Caminho para nosso "Banco de Dados"
// __dirname obtém o caminho do DIRETÓRIO ATUAL (models)
// 'data', 'produtos.json' desce para o nosso arquivo
const dbPath = path.resolve(__dirname, '../data/produtos.json');
class Produto {
   //É o que é chamado quando usamos 'new Produto()'
  constructor(id, nome, preco, estoque, slug) {


   if (!nome || typeof nome !== 'string' || nome.trim() === "") {
   throw new Error("O campo 'nome' é obrigatório e deve ser um texto.");
   }
   if (preco === undefined || typeof preco !== 'number' || preco <= 0) {
       throw new Error("O campo 'preco' é obrigatório e deve ser um número positivo.");
   }
   if (!slug || typeof slug !== 'string' || slug.trim() === "") {
       throw new Error("O campo 'slug' é obrigatório e deve ser um texto.");
   }
   this.id = id;
   this.nome = nome;
   this.preco = preco;
   this.estoque = estoque || 0;
   this.slug = slug;
   this.dataCriacao = new Date().toISOString();
}
static lerTodos() {
       try {
           // Ler o arquivo (simples para a aula)
           const data = fs.readFileSync(dbPath, 'utf8');
           return JSON.parse(data);
// Transforma o texto JSON em um array JS
       } catch (error) {
           // Se o arquivo não existir ou estiver vazio
           return [];
       }
   }
static salvarNovo(produtoInstanciado) {
       // Primeiro, lemos o que já existe
       const produtos = Produto.lerTodos();
// Add o novo produto (já validado pelo constructor)
       produtos.push(produtoInstanciado);
       // Agora, salvamos o array COMPLETO de volta no arquivo
    fs.writeFileSync(dbPath, JSON.stringify(produtos, null, 2), 'utf8');
       return produtoInstanciado;
   }

static exibeViaId(id){
    const produtos = Produto.lerTodos();
    //console.log(produtos);
    const produtoEncontrado = produtos.find((p) => p.id === +id);
    console.log(produtoEncontrado);
    return produtoEncontrado || null;
}

static excluirProduto(id){
    const produtos = Produto.lerTodos();
    //console.log(produtos);
    const novosProdutos = produtos.filter((p) => p.id !== id);
    console.log(novosProdutos)
    if(novosProdutos.length === produtos.length){
        throw new Error("Produto não encontrado");
    }
    fs.writeFileSync(dbPath, JSON.stringify(novosProdutos, null, 2), 'utf8');
}

};
module.exports = Produto;