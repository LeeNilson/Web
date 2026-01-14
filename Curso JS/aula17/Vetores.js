var num = [5,8,4,6]
num [4] = 9
num.push(1)
num.length
num.sort()
 console.log(`O vetor tem ${num.length} posições`)
 console.log(num)

let pos = num.indexOf(8)
    if (pos===-1) {
        console.log('O valor não foi encontrado!')
    }else{
        console.log(`O valor está na posição ${pos}`)
    }


 for (let pos=0;pos<num.length;pos++ ) {
    console.log(`A posição ${pos} tem o valor ${num[pos]}`)
 }

 for (let pos in num) {
    console.log(num[pos])
 }