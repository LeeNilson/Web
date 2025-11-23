// ========== SIMULAÇÃO DE BANCO DE DADOS EM MEMÓRIA ==========
// Em produção, você usaria um banco real como PostgreSQL, MySQL ou MongoDB

class Database {
    constructor() {
        // Dados armazenados em memória
        this.users = [
            {
                id: 1,
                name: 'João Silva',
                email: 'joao@email.com',
                password: '123456',
                createdAt: new Date('2024-01-15')
            },
            {
                id: 2,
                name: 'Maria Santos',
                email: 'maria@email.com',
                password: '123456',
                createdAt: new Date('2024-02-20')
            }
        ];

        this.items = [
            {
                id: 1,
                title: 'Carteira Marrom',
                description: 'Carteira de couro marrom encontrada no corredor A',
                category: 'lost',
                status: 'active',
                location: 'Prédio A - Andar 2',
                userId: 1,
                createdAt: new Date('2024-11-01')
            },
            {
                id: 2,
                title: 'Chaves Toyota',
                description: 'Chaveiro com chaves de carro Toyota',
                category: 'found',
                status: 'active',
                location: 'Estacionamento',
                userId: 2,
                createdAt: new Date('2024-11-10')
            }
        ];

        // Contadores para IDs
        this.userIdCounter = this.users.length + 1;
        this.itemIdCounter = this.items.length + 1;
    }

    // ========== MÉTODOS AUXILIARES ==========
    
    generateId(type) {
        if (type === 'user') {
            return this.userIdCounter++;
        }
        if (type === 'item') {
            return this.itemIdCounter++;
        }
    }

    // Simular delay de rede (opcional)
    async simulateDelay(ms = 100) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ========== MÉTODOS DE USUÁRIO ==========

    async getAllUsers() {
        await this.simulateDelay();
        return [...this.users];
    }

    async getUserById(id) {
        await this.simulateDelay();
        return this.users.find(user => user.id === parseInt(id));
    }

    async getUserByEmail(email) {
        await this.simulateDelay();
        return this.users.find(user => user.email === email);
    }

    async createUser(userData) {
        await this.simulateDelay();
        const newUser = {
            id: this.generateId('user'),
            ...userData,
            createdAt: new Date()
        };
        this.users.push(newUser);
        return newUser;
    }

    async updateUser(id, userData) {
        await this.simulateDelay();
        const index = this.users.findIndex(user => user.id === parseInt(id));
        if (index === -1) return null;
        
        this.users[index] = {
            ...this.users[index],
            ...userData,
            id: this.users[index].id,
            createdAt: this.users[index].createdAt,
            updatedAt: new Date()
        };
        return this.users[index];
    }

    async deleteUser(id) {
        await this.simulateDelay();
        const index = this.users.findIndex(user => user.id === parseInt(id));
        if (index === -1) return false;
        
        this.users.splice(index, 1);
        return true;
    }

    // ========== MÉTODOS DE ITEM ==========

    async getAllItems(filters = {}) {
        await this.simulateDelay();
        let items = [...this.items];

        // Aplicar filtros
        if (filters.category) {
            items = items.filter(item => item.category === filters.category);
        }
        if (filters.status) {
            items = items.filter(item => item.status === filters.status);
        }
        if (filters.userId) {
            items = items.filter(item => item.userId === parseInt(filters.userId));
        }

        return items;
    }

    async getItemById(id) {
        await this.simulateDelay();
        return this.items.find(item => item.id === parseInt(id));
    }

    async createItem(itemData) {
        await this.simulateDelay();
        const newItem = {
            id: this.generateId('item'),
            ...itemData,
            createdAt: new Date()
        };
        this.items.push(newItem);
        return newItem;
    }

    async updateItem(id, itemData) {
        await this.simulateDelay();
        const index = this.items.findIndex(item => item.id === parseInt(id));
        if (index === -1) return null;
        
        this.items[index] = {
            ...this.items[index],
            ...itemData,
            id: this.items[index].id,
            createdAt: this.items[index].createdAt,
            updatedAt: new Date()
        };
        return this.items[index];
    }

    async deleteItem(id) {
        await this.simulateDelay();
        const index = this.items.findIndex(item => item.id === parseInt(id));
        if (index === -1) return false;
        
        this.items.splice(index, 1);
        return true;
    }

    // ========== MÉTODOS DE ESTATÍSTICAS ==========

    async getStats() {
        await this.simulateDelay();
        return {
            totalUsers: this.users.length,
            totalItems: this.items.length,
            lostItems: this.items.filter(i => i.category === 'lost').length,
            foundItems: this.items.filter(i => i.category === 'found').length,
            activeItems: this.items.filter(i => i.status === 'active').length
        };
    }
}

// Exportar instância única (Singleton)
module.exports = new Database();