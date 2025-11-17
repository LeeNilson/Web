// models/produto.js

const fs = require('fs');
const path = require('path');

class Produto {
    constructor(id, nome, preco, estoque, slug) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
        this.slug = slug;
    }

    static lerTodos() {
        const caminhoArquivo = path.join(__dirname, '../data/produtos.json');
        const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
        return JSON.parse(dados);
    }

    static salvarNovo(produto) {
        const produtos = this.lerTodos();
        produtos.push(produto);
        const caminhoArquivo = path.join(__dirname, '../data/produtos.json');
        fs.writeFileSync(caminhoArquivo, JSON.stringify(produtos, null, 2));
    }

    // NOVO MÉTODO: Buscar produto por slug
    static buscarPorSlug(slug) {
        const produtos = this.lerTodos();
        return produtos.find(p => p.slug === slug);
    }

    // NOVO MÉTODO: Buscar produto por ID
    static buscarPorId(id) {
        const produtos = this.lerTodos();
        return produtos.find(p => p.id === id);
    }

    // NOVO MÉTODO: Excluir produto por ID
    static excluir(id) {
        const produtos = this.lerTodos();
        const produtosFiltrados = produtos.filter(p => p.id !== id);
        
        // Verifica se algum produto foi removido
        if (produtos.length === produtosFiltrados.length) {
            return false; // Produto não encontrado
        }
        
        const caminhoArquivo = path.join(__dirname, '../data/produtos.json');
        fs.writeFileSync(caminhoArquivo, JSON.stringify(produtosFiltrados, null, 2));
        return true; // Produto excluído com sucesso
    }
}

module.exports = Produto;