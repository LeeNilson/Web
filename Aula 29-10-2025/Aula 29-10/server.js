const express = require('express');
const path = require('path'); // Módulo 'path' é essencial
const app = express();
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PORTA = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// formulários HTML tradicionais
const apiRoutes = require('./routes/apiRoutes');
const viewRoutes = require('./routes/viewRoutes');
const authRoutes = require('./routes/authRoutes')
app.use('/api', apiRoutes);
app.use('/', viewRoutes);
app.use('/api', authRoutes);
app.listen(PORTA, () => {
   console.log(`Servidor API rodando em http://localhost:${PORTA}`);
});
