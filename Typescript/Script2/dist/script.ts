class Produto{
    nome: string;
    preco: number;
    constructor(nome: string, preco: number) {
        this.nome = nome;
        this.preco = preco;
    }   
    precoReal (){
        return `R$ ${this.preco}`;
    }
}

const livro = new Produto("A guerra dos tronos", 200);

instanceof Produto; //true
instanceof String; //false