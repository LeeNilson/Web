const password = document.getElementById('senha');
const user = document.getElementById('usuario');
const button = document.getElementById('btn');

document.getElementById('btn').addEventListener('click', function (event) {
    event.preventDefault();
    const userValue = user.value;
    const passwordValue = password.value;

    if (userValue === 'admin' && passwordValue === 'admin') {
        alert("Autenticação bem-sucedida!");
        console.log("Autenticação bem-sucedida!");
        // Redireciona para a página de registro
        window.location.href = 'registration.html';
    } else {
        alert("Credenciais incorretas. Tente novamente.");
        console.log("Falha na autenticação.");
    }
});

password.addEventListener('keyup', function (event) {
    if (event.target.value === 'admin') {
        console.log("Senha correta");
    } else {
        console.log("Senha incorreta");
    }
});

user.addEventListener('keyup', function (event) {
    if (event.target.value === 'admin') {
        console.log("Usuário correto");
    } else {
        console.log("Usuário incorreto");
    }
});