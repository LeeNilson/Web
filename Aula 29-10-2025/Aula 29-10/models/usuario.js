const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const dbPath = 
path.resolve(__dirname, '../data/usuarios.json');

class Usuario {
    constructor(id, email, senha, role){
        this.id = id;
        this.email = email;
        this.senhaHash = bcrypt.hashSync(senha, 10);
        this.role = role;
    }
static lerTodos() {
       try {
           // Ler o arquivo (simples para a aula)
           const data = fs.readFileSync(dbPath, 'utf8');
           return JSON.parse(data);
// Transforma o texto JSON em um array JS
       } catch (error) {
           // Se o arquivo não existir ou estiver vazio
           return [];
       }
   }
   salvar(){
    const usuarios = Usuario.lerTodos();
    usuarios.push({
        id: this.id,
        email: this.email,
        senhaHash: this.senhaHash,
        role: this.role
    })
    fs.writeFileSync(dbPath, 
        JSON.stringify(usuarios, null, 2), 'utf8');
    return this;
   }
   static BuscaPorId(id){
    const usuarios = Usuario.lerTodos();
    return usuarios.find(u => u.id == id);
   }
   static BuscaPorEmail(email){
    const usuarios = Usuario.lerTodos();
    return usuarios.find(u => u.email == email);
   }

}
module.exports = Usuario; 