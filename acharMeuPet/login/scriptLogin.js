const password = document.getElementById('senha');
const user = document.getElementById('usuario');
const button = document.getElementById('btn');

document.getElementById('formLogin').addEventListener('submit', function (event) {
    event.preventDefault();
    const userValue = user.value;
    const passwordValue = password.value;

    if (userValue === 'admin' && passwordValue === 'admin') {
        alert("Autenticação bem-sucedida!");
        console.log("Autenticação bem-sucedida!");
      
    } else {
        alert("Credenciais incorretas. Tente novamente.");
        console.log("Falha na autenticação.");
    }
});

password.addEventListener('keyup', function (event) {
    if (event.target.value === 'admin') {
        console.log("Sucessful authentication");
        

    } else {
        console.log("Failed authentication");
        
    }
});

user.addEventListener('keyup', function (event) {
    if (event.target.value === 'admin') {
        console.log("Sucessful authentication");
        
    } else {
        console.log("Failed authentication");

    }
});

