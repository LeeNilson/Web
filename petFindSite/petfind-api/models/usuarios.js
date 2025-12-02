const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, '/petfind-api/data/usuarios.json');

class Usuario {

    constructor(email, senha, role = 'cliente') {

        this.id = id;
        this.email = email;
        this.senhaHash = bcrypt.hashSync(senha, 10);
        this.role = role;

        salvar() {
            const usuarios = Usuario.lerTodos();
            usuarios.push({
                id: this.id,
                email: this.email,
                senhaHash: this.senhaHash,
                role: this.role
            });
            fs.writeFileSync
                (dbPath, JSON.stringify(usuarios, null, 2));
            return this;
        }
    }
}

// Lê todos os usuários
static lerTodos() {
        try {
            const data = fs.readFileSync(dbPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }


    // Encontra usuário pelo email
    static findByEmail(email) {
        const usuarios = Usuario.lerTodos();
        return usuarios.find(u => u.email === email);
    }
    // Encontra usuário pelo ID
    static findById(id) {
        const usuarios = Usuario.lerTodos();
        return usuarios.find(u => u.id === id);
    }