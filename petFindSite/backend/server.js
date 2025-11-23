// ========== IMPORTAÇÕES ==========
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

// ========== CONFIGURAÇÃO DO APP ==========
const app = express();
const PORT = process.env.PORT || 3000;

// ========== MIDDLEWARES ==========
// CORS - Permitir requisições do frontend
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true
}));

// Parser de JSON
app.use(express.json());

// Parser de URL encoded
app.use(express.urlencoded({ extended: true }));

// Log de requisições (middleware customizado)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ========== ROTAS ==========
// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: '🚀 API está funcionando!',
        version: process.env.API_VERSION || 'v1',
        endpoints: {
            users: '/api/users',
            items: '/api/items'
        }
    });
});

// Usar rotas da API
app.use('/api', routes);

// ========== ROTA 404 ==========
app.use((req, res) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        message: `A rota ${req.method} ${req.url} não existe`
    });
});

// ========== TRATAMENTO DE ERROS ==========
app.use((err, req, res, next) => {
    console.error('Erro:', err.stack);
    res.status(err.status || 500).json({
        error: 'Erro no servidor',
        message: err.message || 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ========== INICIAR SERVIDOR ==========
app.listen(PORT, () => {
    console.log('========================================');
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log('========================================');
    console.log('📋 Endpoints disponíveis:');
    console.log(`   GET  http://localhost:${PORT}/api/users`);
    console.log(`   POST http://localhost:${PORT}/api/users`);
    console.log(`   GET  http://localhost:${PORT}/api/items`);
    console.log(`   POST http://localhost:${PORT}/api/items`);
    console.log('========================================');
});

// ========== TRATAMENTO DE ERROS NÃO CAPTURADOS ==========
process.on('unhandledRejection', (err) => {
    console.error('❌ Erro não tratado:', err);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('❌ Exceção não capturada:', err);
    process.exit(1);
});