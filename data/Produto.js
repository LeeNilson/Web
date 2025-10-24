const { v4: uuidv4 } = require('uuid'); // Corrigido: era "uuiddv4"
const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, 'produtos.json');

class Produto {
    constructor(nome, preco, estoque, slug) { // Adicionado parâmetro 'slug'
        if (!nome || typeof nome !== 'string' || nome.trim() === "") {
            throw new Error("O campo 'nome' é obrigatório e deve ser um texto.");
        }
        if (preco === undefined || typeof preco !== 'number' || preco <= 0) {
            throw new Error("O campo 'preco' é obrigatório e deve ser um número positivo.");
        }
        if (!slug || typeof slug !== 'string' || slug.trim() === "") {
            throw new Error("O campo 'slug' é obrigatório e deve ser um texto.");
        }
        
        this.id = uuidv4(); // Corrigido: era "uuiddv4"
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque || 0;
        this.slug = slug; // Corrigido: era "this.slug"
        this.dataCriacao = new Date().toISOString();
    }
    
    static lerTodos() { // Corrigido: removidos parâmetros desnecessários
        try { // Adicionado bloco try que estava faltando
            const data = fs.readFileSync(dbPath, 'utf8');
            const produtos = JSON.parse(data);
            return produtos; // Adicionado return dentro do try
        } catch(error) {
            // Se o arquivo não existir, retorna array vazio
            if (error.code === 'ENOENT') {
                return [];
            }
            throw new Error("Erro ao ler o arquivo de produtos: " + error.message);
        }
    }

    static salvarNovo(produtoInstanciado) {
        const produtos = Produto.lerTodos();
        produtos.push(produtoInstanciado);
        fs.writeFileSync(dbPath, JSON.stringify(produtos, null, 2), 'utf8');
        return produtoInstanciado;
    }
}

module.exports = Produto; // Adicionado export da classe