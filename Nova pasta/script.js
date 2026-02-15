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
} */
var input = document.querySelector('input');
var p = document.querySelector('p');
if (input) {
    var total = localStorage.getItem('total');
    input.value = total || '0';
    calcularGanho(Number(input === null || input === void 0 ? void 0 : input.valueAsNumber) || 0);
}
function calcularGanho(value) {
    if (p) {
        var resultado = value + 100 - (value * 0.2);
        p.innerText = "ganho total: ".concat(resultado);
    }
}
function totalMudou() {
    var value = Number(input === null || input === void 0 ? void 0 : input.valueAsNumber);
    localStorage.setItem('total', value.toString());
    calcularGanho(value);
}
input === null || input === void 0 ? void 0 : input.addEventListener('keyup', totalMudou);
var greeter1 = /** @class */ (function () {
    function greeter1(message) {
        this.greeting = message;
    }
    greeter1.prototype.greet = function () {
        return "Sejam bem vindos, " + this.greeting;
    };
    return greeter1;
}());
var greeter = new greeter1("CDFs");
console.log(greeter.greet());
