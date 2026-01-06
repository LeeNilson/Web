function verificar(){
    var data = new Date ()
    var ano = data.getFullYear()
    var fsex = document.getElementsByName('radsex')
    var fano = document.getElementById('txtano')
    var res = document.querySelector('div#res')
    var idade = ano - Number (fano.value) 
    var genero = ''
    var img = document.createElement('img')
    img.setAttribute('id','foto')
    
    if (fsex[0].checked) {
        genero = 'Homem'
        if (idade >=0 && idade < 10){
            img.setAttribute('src', 'bebeMasculino.jpg')
        } else if (idade < 21){
            img.setAttribute('src', 'homemJovem.jpg')
        } else if ( idade < 50 ){
            img.setAttribute('src', 'homemAdulto.jpg')
        } else{
            img.setAttribute('src', 'homemIdoso.jpg')
        }
    }

        if (fsex[1].checked) {
        genero = 'Mulher'
        if (idade >=0 && idade < 10){
        img.setAttribute('src', 'bebeFeminino.jpg')
        } else if (idade < 21){
        img.setAttribute('src', 'mulherJovem.jpg')
        } else if ( idade < 50 ){
        img.setAttribute('src', 'mulherAdulta.jpg')
        } else{
        img.setAttribute('src', 'mulherIdosa.jpg')
        }
    }

    res.style.textAlign = 'center'
    res.innerHTML = `Detectamos ${genero} com ${idade} anos.` 
    res.appendChild(img) 
    }
