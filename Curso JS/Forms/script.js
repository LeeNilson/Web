const password = document.getElementById('senha');
const user = document.getElementById('usuario');
const button = document.getElementById('btn');    


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

document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault();                 
});
