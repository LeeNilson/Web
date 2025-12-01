const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// Rotas
const authRoutes = require('./routes/auth');
const animaisRoutes = require('./routes/animais');
const categoriasRoutes = require('./routes/categorias');

app.use('/api/auth', authRoutes);
app.use('/api/animais', animaisRoutes);
app.use('/api/categorias', categoriasRoutes);

// Rota raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║   🐾 Pet Find API                      ║
    ║   🚀 Servidor rodando na porta ${PORT}    ║
    ║   📡 http://localhost:${PORT}            ║
    ║   📚 Documentação: /api/docs           ║
    ╚════════════════════════════════════════╝
    `);
});
