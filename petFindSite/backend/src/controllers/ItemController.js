// ========== CONTROLLER: ITEM (Achados e Perdidos) ==========

const Item = require('../models/Item');

class ItemController {
    
    // ========== GET: Listar todos os itens ==========
    async index(req, res) {
        try {
            // Filtros opcionais da query string
            const filters = {
                category: req.query.category, // ?category=lost ou ?category=found
                status: req.query.status,     // ?status=active
                userId: req.query.userId      // ?userId=1
            };

            // Remover filtros vazios
            Object.keys(filters).forEach(key => {
                if (!filters[key]) delete filters[key];
            });

            const items = await Item.findAll(filters);
            
            res.status(200).json({
                success: true,
                count: items.length,
                filters: Object.keys(filters).length > 0 ? filters : null,
                data: items.map(item => item.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar itens',
                error: error.message
            });
        }
    }

    // ========== GET: Buscar item por ID ==========
    async show(req, res) {
        try {
            const { id } = req.params;
            const item = await Item.findById(id);

            if (!item) {
                return res.status(404).json({
                    success: false,
                    message: 'Item não encontrado'
                });
            }

            res.status(200).json({
                success: true,
                data: item.toJSON()
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar item',
                error: error.message
            });
        }
    }

    // ========== POST: Criar novo item ==========
    async store(req, res) {
        try {
            const { title, description, category, location, userId, status } = req.body;

            // Validar campos obrigatórios
            if (!title || !description || !category || !location || !userId) {
                return res.status(400).json({
                    success: false,
                    message: 'Campos obrigatórios: title, description, category, location, userId'
                });
            }

            // Criar item
            const newItem = await Item.create({
                title,
                description,
                category,
                location,
                userId: parseInt(userId),
                status: status || 'active'
            });

            res.status(201).json({
                success: true,
                message: 'Item criado com sucesso',
                data: newItem.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erro ao criar item',
                error: error.message
            });
        }
    }

    // ========== PUT: Atualizar item ==========
    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Remover campos que não devem ser atualizados diretamente
            delete updateData.id;
            delete updateData.createdAt;
            delete updateData.userId; // Não permitir mudança de dono

            const updatedItem = await Item.update(id, updateData);

            res.status(200).json({
                success: true,
                message: 'Item atualizado com sucesso',
                data: updatedItem.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erro ao atualizar item',
                error: error.message
            });
        }
    }

    // ========== DELETE: Deletar item ==========
    async destroy(req, res) {
        try {
            const { id } = req.params;
            await Item.delete(id);

            res.status(200).json({
                success: true,
                message: 'Item deletado com sucesso'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erro ao deletar item',
                error: error.message
            });
        }
    }

    // ========== GET: Buscar itens perdidos ==========
    async getLostItems(req, res) {
        try {
            const items = await Item.findByCategory('lost');
            
            res.status(200).json({
                success: true,
                count: items.length,
                data: items.map(item => item.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar itens perdidos',
                error: error.message
            });
        }
    }

    // ========== GET: Buscar itens encontrados ==========
    async getFoundItems(req, res) {
        try {
            const items = await Item.findByCategory('found');
            
            res.status(200).json({
                success: true,
                count: items.length,
                data: items.map(item => item.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar itens encontrados',
                error: error.message
            });
        }
    }

    // ========== GET: Buscar itens de um usuário ==========
    async getUserItems(req, res) {
        try {
            const { userId } = req.params;
            const items = await Item.findByUser(parseInt(userId));
            
            res.status(200).json({
                success: true,
                count: items.length,
                data: items.map(item => item.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar itens do usuário',
                error: error.message
            });
        }
    }

    // ========== GET: Estatísticas ==========
    async getStats(req, res) {
        try {
            const stats = await Item.getStats();
            
            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar estatísticas',
                error: error.message
            });
        }
    }

    // ========== PATCH: Marcar como resolvido ==========
    async markAsResolved(req, res) {
        try {
            const { id } = req.params;
            const item = await Item.findById(id);

            if (!item) {
                return res.status(404).json({
                    success: false,
                    message: 'Item não encontrado'
                });
            }

            const updatedItem = await item.markAsResolved();

            res.status(200).json({
                success: true,
                message: 'Item marcado como resolvido',
                data: updatedItem.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erro ao marcar item como resolvido',
                error: error.message
            });
        }
    }
}

// Exportar instância única
module.exports = new ItemController();