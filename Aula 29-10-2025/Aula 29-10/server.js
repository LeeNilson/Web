const express = require('express');
const path = require('path');
const app = express();

// Importar as rotas
const viewRoutes = require('./routes/viewRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', viewRoutes);  // Rotas que retornam HTML
app.use('/', apiRoutes);   // Rotas da API que retornam JSON

// Rota raiz
app.get('/', (req, res) => {
    res.redirect('/produtos');
});

// Middleware de erro 404
app.use((req, res) => {
    res.status(404).send(`
        <h1>Erro 404 - Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <a href="/produtos">Voltar ao catálogo</a>
    `);
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    console.log(`📦 Catálogo: http://localhost:${PORT}/produtos`);
    console.log(`🔌 API: http://localhost:${PORT}/api/produtos`);
});