// ========== MODEL: USER ==========
// Define a estrutura e validações dos dados de usuário

const db = require('./database');

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    // ========== VALIDAÇÕES ==========

    static validate(data) {
        const errors = [];

        // Validar nome
        if (!data.name || data.name.trim().length < 3) {
            errors.push('Nome deve ter no mínimo 3 caracteres');
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push('Email inválido');
        }

        // Validar senha
        if (!data.password || data.password.length < 6) {
            errors.push('Senha deve ter no mínimo 6 caracteres');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // ========== MÉTODOS DE ACESSO AO BANCO ==========

    static async findAll() {
        const users = await db.getAllUsers();
        return users.map(user => new User(user));
    }

    static async findById(id) {
        const user = await db.getUserById(id);
        return user ? new User(user) : null;
    }

    static async findByEmail(email) {
        const user = await db.getUserByEmail(email);
        return user ? new User(user) : null;
    }

    static async create(userData) {
        // Validar dados
        const validation = this.validate(userData);
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }

        // Verificar se email já existe
        const existingUser = await db.getUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        // Criar usuário
        const newUser = await db.createUser(userData);
        return new User(newUser);
    }

    static async update(id, userData) {
        // Verificar se usuário existe
        const existingUser = await db.getUserById(id);
        if (!existingUser) {
            throw new Error('Usuário não encontrado');
        }

        // Se está atualizando email, verificar se não está em uso
        if (userData.email && userData.email !== existingUser.email) {
            const emailInUse = await db.getUserByEmail(userData.email);
            if (emailInUse) {
                throw new Error('Email já cadastrado');
            }
        }

        // Atualizar
        const updatedUser = await db.updateUser(id, userData);
        return new User(updatedUser);
    }

    static async delete(id) {
        const result = await db.deleteUser(id);
        if (!result) {
            throw new Error('Usuário não encontrado');
        }
        return true;
    }

    // ========== MÉTODOS DE INSTÂNCIA ==========

    // Retornar dados sem senha (segurança)
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    // Verificar senha (em produção, use bcrypt)
    async verifyPassword(password) {
        return this.password === password;
    }
}

module.exports = User;