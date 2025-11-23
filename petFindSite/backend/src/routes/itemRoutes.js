// ========== ROTAS: ITENS (Achados e Perdidos) ==========

const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

// ========== ROTAS PÚBLICAS ==========

// GET /api/items - Listar todos os itens (com filtros opcionais)
// Exemplos:
//   /api/items
//   /api/items?category=lost
//   /api/items?status=active
//   /api/items?userId=1
router.get('/', ItemController.index.bind(ItemController));

// GET /api/items/stats - Estatísticas
router.get('/stats', ItemController.getStats.bind(ItemController));

// GET /api/items/lost - Listar apenas itens perdidos
router.get('/lost', ItemController.getLostItems.bind(ItemController));

// GET /api/items/found - Listar apenas itens encontrados
router.get('/found', ItemController.getFoundItems.bind(ItemController));

// GET /api/items/user/:userId - Listar itens de um usuário específico
router.get('/user/:userId', ItemController.getUserItems.bind(ItemController));

// GET /api/items/:id - Buscar item específico por ID
router.get('/:id', ItemController.show.bind(ItemController));

// POST /api/items - Criar novo item
router.post('/', ItemController.store.bind(ItemController));

// PUT /api/items/:id - Atualizar item
router.put('/:id', ItemController.update.bind(ItemController));

// PATCH /api/items/:id/resolved - Marcar como resolvido
router.patch('/:id/resolved', ItemController.markAsResolved.bind(ItemController));

// DELETE /api/items/:id - Deletar item
router.delete('/:id', ItemController.destroy.bind(ItemController));

module.exports = router;