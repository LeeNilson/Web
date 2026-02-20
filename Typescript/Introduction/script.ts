/*function soma(a:number,b:number){
    return a + b;
}
const frase:string ="oi";
const frase2 = 'oi';

const total = 100.05;
const total2:number = 100.25;
const empresas =['Apple','Microsoft'];
frase.toUpperCase();

const operacao = 'true' + 'teste'
const produtos = [
    {
        nome:'Livro Harry Potter', tipo:'Livro fisico'
    },
    {
        nome:'Dark Souls', tipo:'Juegos'
class greeter1{
    greeting : string;
    constructor(message:string){
        this.greeting = message;
    }
    greet(){
        return "Sejam bem vindos, " + this.greeting;
    }
]

function listarProdutos(lista:any[]){
    lista.forEach(produto=>{
        console.log(produto.nome);
    });
}

listarProdutos(produtos);

function normalizarTexto(texto:any){
    return texto.trim().toLowerCase(); // trim() - remove espaços do início E do fim
} 

const input = document.querySelector('input');
const p = document.querySelector('p');

if (input) {
  const total = localStorage.getItem('total');
  input.value = total || '0';
  calcularGanho(Number(input?.valueAsNumber)|| 0);
}

function calcularGanho(value:number) {
if (p) {
    const resultado = value + 100 - (value * 0.2);
    p.innerText = `ganho total: ${resultado}`;
}
}

function totalMudou() {
  const value = Number(input?.valueAsNumber);
  localStorage.setItem('total', value.toString());
  calcularGanho(value);''
}


  input?.addEventListener('keyup', totalMudou);

*/
class greeter1{
    greeting : string;
    constructor(message:string){
        this.greeting = message;
    }
    greet(){
        return "Seja bem vindo, " + this.greeting;
    }
}
let greeter = new greeter1("Usuário");
console.log(greeter.greet());