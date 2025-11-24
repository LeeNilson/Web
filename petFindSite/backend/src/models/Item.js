// ========== MODEL: ITEM (Achados e Perdidos) ==========

const db = require('./database');

class Item {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.category = data.category; // 'lost' ou 'found'
        this.status = data.status; // 'active', 'resolved', 'closed'
        this.location = data.location;
        this.userId = data.userId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    // ========== VALIDAÇÕES ==========

    static validate(data) {
        const errors = [];

        // Validar título
        if (!data.title || data.title.trim().length < 3) {
            errors.push('Título deve ter no mínimo 3 caracteres');
        }

        // Validar descrição
        if (!data.description || data.description.trim().length < 6) {
            errors.push('Descrição deve ter no mínimo 6 caracteres');
        }

        // Validar categoria
        const validCategories = ['lost', 'found'];
        if (!data.category || !validCategories.includes(data.category)) {
            errors.push('Categoria deve ser "lost" ou "found"');
        }

        // Validar status (opcional, tem valor padrão)
        if (data.status) {
            const validStatus = ['active', 'resolved', 'closed'];
            if (!validStatus.includes(data.status)) {
                errors.push('Status inválido');
            }
        }

        // Validar localização
        if (!data.location || data.location.trim().length < 3) {
            errors.push('Localização deve ter no mínimo 3 caracteres');
        }

        // Validar userId
        if (!data.userId || isNaN(data.userId)) {
            errors.push('ID do usuário inválido');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // ========== MÉTODOS DE ACESSO AO BANCO ==========

    static async findAll(filters = {}) {
        const items = await db.getAllItems(filters);
        return items.map(item => new Item(item));
    }

    static async findById(id) {
        const item = await db.getItemById(id);
        return item ? new Item(item) : null;
    }

    static async findByCategory(category) {
        const items = await db.getAllItems({ category });
        return items.map(item => new Item(item));
    }

    static async findByUser(userId) {
        const items = await db.getAllItems({ userId });
        return items.map(item => new Item(item));
    }

    static async create(itemData) {
        // Validar dados
        const validation = this.validate(itemData);
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }

        // Adicionar status padrão se não fornecido
        const dataWithDefaults = {
            ...itemData,
            status: itemData.status || 'active'
        };

        // Criar item
        const newItem = await db.createItem(dataWithDefaults);
        return new Item(newItem);
    }

    static async update(id, itemData) {
        // Verificar se item existe
        const existingItem = await db.getItemById(id);
        if (!existingItem) {
            throw new Error('Item não encontrado');
        }

        // Validar apenas campos que estão sendo atualizados
        if (itemData.category || itemData.status) {
            const validCategories = ['lost', 'found'];
            const validStatus = ['active', 'resolved', 'closed'];
            
            if (itemData.category && !validCategories.includes(itemData.category)) {
                throw new Error('Categoria inválida');
            }
            
            if (itemData.status && !validStatus.includes(itemData.status)) {
                throw new Error('Status inválido');
            }
        }

        // Atualizar
        const updatedItem = await db.updateItem(id, itemData);
        return new Item(updatedItem);
    }

    static async delete(id) {
        const result = await db.deleteItem(id);
        if (!result) {
            throw new Error('Item não encontrado');
        }
        return true;
    }

    // ========== MÉTODOS AUXILIARES ==========

    static async getStats() {
        return await db.getStats();
    }

    // ========== MÉTODOS DE INSTÂNCIA ==========

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            category: this.category,
            status: this.status,
            location: this.location,
            userId: this.userId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    // Verificar se item está ativo
    isActive() {
        return this.status === 'active';
    }

    // Marcar como resolvido
    async markAsResolved() {
        return await Item.update(this.id, { status: 'resolved' });
    }

    // Fechar item
    async close() {
        return await Item.update(this.id, { status: 'closed' });
    }
}

module.exports = Item;