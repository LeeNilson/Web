// server.js - API Backend Completa com todos os endpoints CRUD
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do banco de dados
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'petfind_db'
};

// Pool de conexões
const pool = mysql.createPool(dbConfig);

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ============================================
// ENDPOINTS DE PETS
// ============================================

// GET - Listar todos os pets
app.get('/api/pets', async (req, res) => {
  try {
    const [pets] = await pool.query('SELECT * FROM pets ORDER BY created_at DESC');
    res.json({
      success: true,
      data: pets,
      count: pets.length
    });
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pets',
      error: error.message
    });
  }
});

// GET - Buscar pet por ID
app.get('/api/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [pets] = await pool.query('SELECT * FROM pets WHERE id = ?', [id]);
    
    if (pets.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pet não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: pets[0]
    });
  } catch (error) {
    console.error('Erro ao buscar pet:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pet',
      error: error.message
    });
  }
});

// POST - Criar novo pet
app.post('/api/pets', async (req, res) => {
  try {
    const { name, species, breed, color, size, status, description, location, contact_name, contact_phone, contact_email, photo_url } = req.body;
    
    // Validação básica
    if (!name || !species || !status || !contact_phone) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios: name, species, status, contact_phone'
      });
    }
    
    const query = `
      INSERT INTO pets (name, species, breed, color, size, status, description, location, 
                        contact_name, contact_phone, contact_email, photo_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const [result] = await pool.query(query, [
      name, species, breed, color, size, status, description, location,
      contact_name, contact_phone, contact_email, photo_url
    ]);
    
    res.status(201).json({
      success: true,
      message: 'Pet cadastrado com sucesso',
      data: {
        id: result.insertId,
        name,
        species,
        status
      }
    });
  } catch (error) {
    console.error('Erro ao criar pet:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao cadastrar pet',
      error: error.message
    });
  }
});

// PUT - Atualizar pet completo
app.put('/api/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, species, breed, color, size, status, description, location, 
            contact_name, contact_phone, contact_email, photo_url } = req.body;
    
    // Verificar se o pet existe
    const [existing] = await pool.query('SELECT id FROM pets WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pet não encontrado'
      });
    }
    
    const query = `
      UPDATE pets 
      SET name = ?, species = ?, breed = ?, color = ?, size = ?, status = ?,
          description = ?, location = ?, contact_name = ?, contact_phone = ?,
          contact_email = ?, photo_url = ?, updated_at = NOW()
      WHERE id = ?
    `;
    
    await pool.query(query, [
      name, species, breed, color, size, status, description, location,
      contact_name, contact_phone, contact_email, photo_url, id
    ]);
    
    res.json({
      success: true,
      message: 'Pet atualizado com sucesso',
      data: { id, name, species, status }
    });
  } catch (error) {
    console.error('Erro ao atualizar pet:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar pet',
      error: error.message
    });
  }
});

// PATCH - Atualizar campos específicos do pet
app.patch('/api/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Verificar se o pet existe
    const [existing] = await pool.query('SELECT id FROM pets WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pet não encontrado'
      });
    }
    
    // Construir query dinâmica apenas com os campos enviados
    const allowedFields = ['name', 'species', 'breed', 'color', 'size', 'status', 
                          'description', 'location', 'contact_name', 'contact_phone', 
                          'contact_email', 'photo_url'];
    
    const updateFields = [];
    const values = [];
    
    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });
    
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum campo válido para atualizar'
      });
    }
    
    updateFields.push('updated_at = NOW()');
    values.push(id);
    
    const query = `UPDATE pets SET ${updateFields.join(', ')} WHERE id = ?`;
    await pool.query(query, values);
    
    res.json({
      success: true,
      message: 'Pet atualizado parcialmente com sucesso',
      updatedFields: Object.keys(updates).filter(k => allowedFields.includes(k))
    });
  } catch (error) {
    console.error('Erro ao atualizar pet:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar pet',
      error: error.message
    });
  }
});

// DELETE - Remover pet
app.delete('/api/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se o pet existe
    const [existing] = await pool.query('SELECT id, name FROM pets WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pet não encontrado'
      });
    }
    
    await pool.query('DELETE FROM pets WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Pet removido com sucesso',
      data: {
        id,
        name: existing[0].name
      }
    });
  } catch (error) {
    console.error('Erro ao deletar pet:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar pet',
      error: error.message
    });
  }
});

// GET - Buscar pets por status (perdido/encontrado)
app.get('/api/pets/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    const [pets] = await pool.query(
      'SELECT * FROM pets WHERE status = ? ORDER BY created_at DESC',
      [status]
    );
    
    res.json({
      success: true,
      data: pets,
      count: pets.length,
      status
    });
  } catch (error) {
    console.error('Erro ao buscar pets por status:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pets',
      error: error.message
    });
  }
});

// GET - Buscar pets por espécie
app.get('/api/pets/species/:species', async (req, res) => {
  try {
    const { species } = req.params;
    const [pets] = await pool.query(
      'SELECT * FROM pets WHERE species = ? ORDER BY created_at DESC',
      [species]
    );
    
    res.json({
      success: true,
      data: pets,
      count: pets.length,
      species
    });
  } catch (error) {
    console.error('Erro ao buscar pets por espécie:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pets',
      error: error.message
    });
  }
});

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'API Online', 
    timestamp: new Date().toISOString() 
  });
});

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api`);
});