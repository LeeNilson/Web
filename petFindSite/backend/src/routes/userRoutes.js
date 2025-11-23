// ========== ROTAS: USUÁRIOS ==========

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// ========== ROTAS PÚBLICAS ==========

// POST /api/users/login - Login
router.post('/login', UserController.login.bind(UserController));

// POST /api/users - Criar novo usuário (Registro)
router.post('/', UserController.store.bind(UserController));

// ========== ROTAS PROTEGIDAS (em produção, adicione middleware de autenticação) ==========

// GET /api/users - Listar todos os usuários
router.get('/', UserController.index.bind(UserController));

// GET /api/users/:id - Buscar usuário específico
router.get('/:id', UserController.show.bind(UserController));

// PUT /api/users/:id - Atualizar usuário
router.put('/:id', UserController.update.bind(UserController));

// DELETE /api/users/:id - Deletar usuário
router.delete('/:id', UserController.destroy.bind(UserController));

module.exports = router;