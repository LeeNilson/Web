const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
const PORTA = 3000;
app.use(express.json());

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});