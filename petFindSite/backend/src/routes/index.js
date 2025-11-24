// ========== ARQUIVO PRINCIPAL DE ROTAS ==========
// Centraliza todas as rotas da API

const express = require('express');
const router = express.Router();

// Importar rotas específicas
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const contactRoutes = require('./contactRoutes');

// ========== ROTA DE TESTE ==========
router.get('/', (req, res) => {
    res.json({
        message: '✅ API funcionando!',
        version: '1.0.0',
        endpoints: {
            users: {
                base: '/api/users',
                routes: [
                    'GET    /api/users          - Listar usuários',
                    'GET    /api/users/:id      - Buscar usuário',
                    'POST   /api/users          - Criar usuário',
                    'POST   /api/users/login    - Login',
                    'PUT    /api/users/:id      - Atualizar usuário',
                    'DELETE /api/users/:id      - Deletar usuário'
                ]
            },
            items: {
                base: '/api/items',
                routes: [
                    'GET    /api/items              - Listar itens',
                    'GET    /api/items/stats        - Estatísticas',
                    'GET    /api/items/lost         - Itens perdidos',
                    'GET    /api/items/found        - Itens encontrados',
                    'GET    /api/items/user/:userId - Itens do usuário',
                    'GET    /api/items/:id          - Buscar item',
                    'POST   /api/items              - Criar item',
                    'PUT    /api/items/:id          - Atualizar item',
                    'PATCH  /api/items/:id/resolved - Marcar resolvido',
                    'DELETE /api/items/:id          - Deletar item'
                ]
            }
        }
    });
});

// ========== REGISTRAR ROTAS ==========
router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/contact', contactRoutes);

module.exports = router;