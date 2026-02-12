const { Pool } = require('pg');
const express = require('express');

const app = express();
const port = 3000;

// Configuração da conexão usando as variáveis de ambiente do Docker Compose
const pool = new Pool({
  host: process.env.DB_HOST,      // IMPORTANTE: Isso será 'db'
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Hora do Banco de Dados: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao conectar no banco');
  }
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});