const User = require('../models/User');

class UserController {
    
    // ========== GET: Listar todos os usuários ==========
    async index(req, res) {
        try {
            const users = await User.findAll();
            
            res.status(200).json({
                success: true,
                count: users.length,
                data: users.map(user => user.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar usuários',
                error: error.message
            });
        }
    }

    // ========== GET: Buscar usuário por ID ==========
    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            res.status(200).json({
                success: true,
                data: user.toJSON()
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar usuário',
                error: error.message
            });
        }
    }

    // ========== POST: Criar novo usuário ==========
    async store(req, res) {
        try {
            const { name, email, password } = req.body;

            // Validar campos obrigatórios
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Campos obrigatórios: name, email, password'
                });
            }

            // Criar usuário
            const newUser = await User.create({ name, email, password });

            res.status(201).json({
                success: true,
                message: 'Usuário criado com sucesso',
                data: newUser.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erro ao criar usuário',
                error: error.message
            });
        }
    }

    // ========== PUT: Atualizar usuário ==========
    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Remover campos que não devem ser atualizados diretamente
            delete updateData.id;
            delete updateData.createdAt;

            const updatedUser = await User.update(id, updateData);

            res.status(200).json({
                success: true,
                message: 'Usuário atualizado com sucesso',
                data: updatedUser.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erro ao atualizar usuário',
                error: error.message
            });
        }
    }

    // ========== DELETE: Deletar usuário ==========
    async destroy(req, res) {
        try {
            const { id } = req.params;
            await User.delete(id);

            res.status(200).json({
                success: true,
                message: 'Usuário deletado com sucesso'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erro ao deletar usuário',
                error: error.message
            });
        }
    }

    // ========== POST: Login (autenticação) ==========
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email e senha são obrigatórios'
                });
            }

            // Buscar usuário por email
            const user = await User.findByEmail(email);
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

            // Verificar senha
            const isValidPassword = await user.verifyPassword(password);
            
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

            // Login bem-sucedido
            res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso',
                data: user.toJSON()
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao fazer login',
                error: error.message
            });
        }
    }
}

// Exportar instância única
module.exports = new UserController();