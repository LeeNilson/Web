function contar() {
    let NumberStart = window.document.getElementById('txtInitial')
    let NumberEnd = window.document.getElementById('txtFinal')
    let NumberPass = window.document.getElementById('txtPass')
    let res = window.document.getElementById('res')

    if (NumberStart.value.length == 0 || NumberEnd.value.length == 0 || NumberPass.value.length == 0) {
        window.alert('[ERRO]Faltam Dados!')
    } else {
        res.innerHTML = 'contando...'
        let i = Number(NumberStart.value)
        let f = Number(NumberEnd.value)
        let p = Number(NumberPass.value)

        for (let c = i;c <= f; c += p){
            res.innerHTML += c
        }
    }
} 