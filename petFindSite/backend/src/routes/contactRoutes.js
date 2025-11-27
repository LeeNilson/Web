// ========== ROTAS: CONTATO ==========

const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');

// POST /api/contact - Enviar mensagem de contato
router.post('/', ContactController.store.bind(ContactController));
// GET /api/contact - Listar mensagens (admin)
router.get('/', ContactController.index.bind(ContactController));
// PUT /api/contact/:id - Atualizar status da mensagem (admin)
router.put('/:id', ContactController.put.bind(ContactController));
// DELETE /api/contact/:id - Deletar mensagem (admin)
router.delete('/:id', ContactController.delete.bind(ContactController));

module.exports = router;