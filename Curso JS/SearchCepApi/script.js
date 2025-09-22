document.getElementById('formCep').addEventListener('submit', function (event) {
    event.preventDefault();

    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, ''); 

    if (cep.length !== 8) {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
        return; 
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro de rede ao buscar o CEP.');
            }
            return response.json(); 
        })
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                document.getElementById('logradouro').value = '';
                document.getElementById('bairro').value = '';
                document.getElementById('localidade').value = '';
                document.getElementById('uf').value = '';
            } else {
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('localidade').value = data.localidade || ''; 
                document.getElementById('uf').value = data.uf || ''; 
            }
        })
        .catch(error => {
            console.error('Houve um problema com a sua requisição:', error);
            alert("Não foi possível buscar o CEP. Verifique sua conexão.");
        });
});