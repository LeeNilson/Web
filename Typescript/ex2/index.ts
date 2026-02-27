const links = document.querySelectorAll(".link");

links.forEach((link) => {
    const elemento = link as HTMLElement;
    elemento.style.color = 'red';
    elemento.style.border = '1px solid red';
}
);

//Função utilizando padrão generics

function retorno<Tipo>(a: Tipo): Tipo {
    return a;
}

retorno('JOGO').charAt(0);
retorno(200).toFixed(2);

function firstFive<Tipo>(lista: Tipo[]): Tipo[] {
    return lista.slice(0, 5);
}
const numeros = [1, 2, 3, 4, 5, 6, 7];
const frutas = ['maçã', 'banana', 'laranja', 'uva', 'pera', 'abacaxi'];

console.log(firstFive(numeros));
console.log(firstFive(frutas));