const passwordInput = document.getElementById('senha');
const userInput = document.getElementById('usuario');
const btn = document.getElementById('btn');

btn.addEventListener('click', function (event) {
    event.preventDefault();

    const userValue = userInput.value;
    const passwordValue = passwordInput.value;

   
    fetch('http://localhost:3000/tutores')
        .then(response => {
            
            if (!response.ok) {
                throw new Error("Erro ao carregar arquivo de usuários");
            }
            return response.json();
        })
        .then(usuarios => {
           
            const usuarioEncontrado = usuarios.find(user => 
                user.email === userValue && user.senha === passwordValue
            );

            if (usuarioEncontrado) {
                // SUCESSO
                alert("Autenticação bem-sucedida!");
                console.log("Usuário logado:", usuarioEncontrado.email);
                
                // Redirecionamento
                window.location.href = '/FrontEnd/pages/found/found.html';
            } else {
                // FALHA
                alert("Email ou senha incorretos.");
                console.log("Falha na autenticação.");
            }
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
            alert("Erro no sistema de login.");
        });
});

passwordInput.addEventListener('keyup', logTyping);
userInput.addEventListener('keyup', logTyping);

function logTyping(event) {
    
    console.log("Digitando...", event.target.value);
}

