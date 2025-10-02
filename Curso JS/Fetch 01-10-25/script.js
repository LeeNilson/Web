
const btn = document.querySelector("button");
function salvadados(event){
    event.preventDefault();
    const nome = document.querySelector("#name").value;
    const urlimg = document.querySelector("#avatar").value;
    dados = {
        name: nome,
        avatar: urlimg
    };
    fetch("https://68ddb9cfd7b591b4b78d3b0c.mockapi.io/api/v1/users&quot;,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)
    }).then(response => alert(response.status))

    // fetch("https://68ddb9cfd7b591b4b78d3b0c.mockapi.io/api/v1/users/5&quot;,{
    //     method: 'DELETE',
    // }).then(response => response.json())
    // .then(resposta => alert(resposta.status))
}
btn.addEventListener('click', salvadados)