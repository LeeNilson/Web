const form = document.querySelector('form'); 
 function(event) {
  event.preventDefault();

  const userId = document.getElementById('userId').value;
  const nome = document.getElementById('nome').value;
  const urlimg = document.getElementById('urlimg').value;
  
  const dados = {
      name: nome,
      avatar: urlimg
  };

  const baseURL = "https://68ddb9cfd7b591b4b78d3b0c.mockapi.io/api/v1/users";
  const url = userId ? `${baseURL}/${userId}` : baseURL;
  const method = userId ? 'PUT' : 'POST';

  console.log('User ID:', userId || 'N/A (Criando novo)');
  console.log('Método:', method);
  console.log('URL:', url);
  console.log('Dados enviados:', dados);

  const novoUsuario =
{ nome: 'Alice', email: 'alice@exemplo.com' };
fetch('https://suaapi.com/usuarios', {
method: 'POST',
headers: {
'Content-Type': 'application/json' },
body: JSON.stringify(novoUsuario)
})
.then(response => response.json())
.then(data => { console.log('Usuário criado:', data);
}).catch(error => { console.error('Erro:', error);});
    