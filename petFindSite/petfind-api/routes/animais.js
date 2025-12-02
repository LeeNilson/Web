const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pool = require('../config/database');
const { verificarToken } = require('../middleware/auth');

// Configurar Multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'pet-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas!'));
        }
    }
});

// GET - Listar animais com filtros avançados
router.get('/', async (req, res) => {
    try {
        const { 
            tipo, 
            cidade, 
            estado, 
            categoria, 
            sexo, 
            porte,
            data_inicio,
            data_fim,
            page = 1, 
            limit = 20 
        } = req.query;
        
        const offset = (page - 1) * limit;
        
        let query = `
            SELECT 
                a.id, a.nome, a.tipo_anuncio, a.descricao,
                a.cidade, a.estado, a.data_ocorrencia, a.sexo, a.porte,
                a.cor_principal, a.recompensa, a.visualizacoes,
                c.nome as categoria, r.nome as raca,
                u.nome as nome_usuario, u.celular,
                (SELECT caminho_foto FROM fotos_animais 
                 WHERE animal_id = a.id AND principal = true LIMIT 1) as foto,
                (SELECT COUNT(*) FROM comentarios WHERE animal_id = a.id) as total_comentarios
            FROM animais a
            INNER JOIN usuarios u ON a.usuario_id = u.id
            INNER JOIN categorias c ON a.categoria_id = c.id
            LEFT JOIN racas r ON a.raca_id = r.id
            WHERE a.status = 'ativo' AND u.ativo = true
        `;
        
        const params = [];
        let paramIndex = 1;
        
        if (tipo) {
            query += ` AND a.tipo_anuncio = $${paramIndex}`;
            params.push(tipo);
            paramIndex++;
        }
        
        if (cidade) {
            query += ` AND a.cidade ILIKE $${paramIndex}`;
            params.push(`%${cidade}%`);
            paramIndex++;
        }
        
        if (estado) {
            query += ` AND a.estado = $${paramIndex}`;
            params.push(estado);
            paramIndex++;
        }
        
        if (categoria) {
            query += ` AND c.id = $${paramIndex}`;
            params.push(categoria);
            paramIndex++;
        }
        
        if (sexo) {
            query += ` AND a.sexo = $${paramIndex}`;
            params.push(sexo);
            paramIndex++;
        }
        
        if (porte) {
            query += ` AND a.porte = $${paramIndex}`;
            params.push(porte);
            paramIndex++;
        }
        
        if (data_inicio) {
            query += ` AND a.data_ocorrencia >= $${paramIndex}`;
            params.push(data_inicio);
            paramIndex++;
        }
        
        if (data_fim) {
            query += ` AND a.data_ocorrencia <= $${paramIndex}`;
            params.push(data_fim);
            paramIndex++;
        }
        
        // Contar total
        const countQuery = query.replace(
            /SELECT .* FROM/s, 
            'SELECT COUNT(*) FROM'
        ).replace(/ORDER BY.*$/s, '');
        
        const countResult = await pool.query(countQuery, params);
        const total = parseInt(countResult.rows[0].count);
        
        // Adicionar paginação
        query += ` ORDER BY a.data_cadastro DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        params.push(limit, offset);
        
        const result = await pool.query(query, params);
        
        res.json({
            success: true,
            data: result.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: total,
                totalPages: Math.ceil(total / limit)
            }
        });
        
    } catch (error) {
        console.error('Erro ao listar animais:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar animais',
            error: error.message
        });
    }
});

// POST - Cadastrar animal com fotos
router.post('/', verificarToken, upload.array('fotos', 5), async (req, res) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        const {
            categoria_id, raca_id, nome, tipo_anuncio,
            sexo, porte, cor_principal, cor_secundaria,
            caracteristicas_especiais, data_ocorrencia,
            hora_ocorrencia, endereco_completo, bairro,
            cidade, estado, cep, latitude, longitude,
            ponto_referencia, descricao, recompensa
        } = req.body;
        
        const usuario_id = req.usuario.id;
        
        // Validação
        if (!categoria_id || !cidade || !descricao || !tipo_anuncio || !data_ocorrencia) {
            throw new Error('Dados obrigatórios não fornecidos');
        }
        
        // Inserir animal
        const animalQuery = `
            INSERT INTO animais 
            (usuario_id, categoria_id, raca_id, nome, tipo_anuncio,
             sexo, porte, cor_principal, cor_secundaria, caracteristicas_especiais,
             data_ocorrencia, hora_ocorrencia, endereco_completo, bairro, cidade,
             estado, cep, latitude, longitude, ponto_referencia, descricao, recompensa)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
            RETURNING id
        `;
        
        const animalValues = [
            usuario_id, categoria_id, raca_id, nome, tipo_anuncio,
            sexo, porte, cor_principal, cor_secundaria, caracteristicas_especiais,
            data_ocorrencia, hora_ocorrencia, endereco_completo, bairro, cidade,
            estado, cep, latitude, longitude, ponto_referencia, descricao, recompensa
        ];
        
        const animalResult = await client.query(animalQuery, animalValues);
        const animalId = animalResult.rows[0].id;
        
        // Inserir fotos
        if (req.files && req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                const foto = req.files[i];
                const fotosQuery = `
                    INSERT INTO fotos_animais (animal_id, caminho_foto, ordem, principal)
                    VALUES ($1, $2, $3, $4)
                `;
                const principal = i === 0; // Primeira foto é principal
                await client.query(fotosQuery, [animalId, foto.filename, i, principal]);
            }
        }
        
        await client.query('COMMIT');
        
        res.status(201).json({
            success: true,
            message: 'Animal cadastrado com sucesso!',
            data: { 
                id: animalId,
                fotos_enviadas: req.files?.length || 0
            }
        });
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Erro ao cadastrar animal:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar animal',
            error: error.message
        });
    } finally {
        client.release();
    }
});

// GET - Buscar por ID (com detalhes completos)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Buscar animal
        const animalQuery = `
            SELECT 
                a.*,
                c.nome as categoria,
                r.nome as raca,
                u.id as usuario_id,
                u.nome as nome_usuario,
                u.email as email_usuario,
                u.telefone, u.celular,
                u.cidade as cidade_usuario
            FROM animais a
            INNER JOIN usuarios u ON a.usuario_id = u.id
            INNER JOIN categorias c ON a.categoria_id = c.id
            LEFT JOIN racas r ON a.raca_id = r.id
            WHERE a.id = $1
        `;
        
        const animalResult = await pool.query(animalQuery, [id]);
        
        if (animalResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Animal não encontrado'
            });
        }
        
        const animal = animalResult.rows[0];
        
        // Buscar fotos
        const fotosResult = await pool.query(
            'SELECT * FROM fotos_animais WHERE animal_id = $1 ORDER BY ordem',
            [id]
        );
        animal.fotos = fotosResult.rows;
        
        // Buscar comentários
        const comentariosResult = await pool.query(
            `SELECT c.*, u.nome as nome_usuario
             FROM comentarios c
             INNER JOIN usuarios u ON c.usuario_id = u.id
             WHERE c.animal_id = $1 AND c.aprovado = true
             ORDER BY c.data_comentario DESC`,
            [id]
        );
        animal.comentarios = comentariosResult.rows;
        
        // Registrar visualização
        await pool.query(
            'UPDATE animais SET visualizacoes = visualizacoes + 1 WHERE id = $1',
            [id]
        );
        
        res.json({
            success: true,
            data: animal
        });
        
    } catch (error) {
        console.error('Erro ao buscar animal:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar animal',
            error: error.message
        });
    }
});

// PUT - Atualizar status (reunido, cancelado)
router.put('/:id/status', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const usuario_id = req.usuario.id;
        
        // Verificar se o animal pertence ao usuário
        const checkResult = await pool.query(
            'SELECT usuario_id FROM animais WHERE id = $1',
            [id]
        );
        
        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Animal não encontrado'
            });
        }
        
        if (checkResult.rows[0].usuario_id !== usuario_id) {
            return res.status(403).json({
                success: false,
                message: 'Você não tem permissão para alterar este animal'
            });
        }
        
        // Atualizar status
        await pool.query(
            'UPDATE animais SET status = $1 WHERE id = $2',
            [status, id]
        );
        
        res.json({
            success: true,
            message: 'Status atualizado com sucesso!'
        });
        
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar status',
            error: error.message
        });
    }
});

// POST - Adicionar comentário
router.post('/:id/comentarios', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { comentario } = req.body;
        const usuario_id = req.usuario.id;
        
        if (!comentario) {
            return res.status(400).json({
                success: false,
                message: 'Comentário é obrigatório'
            });
        }
        
        const result = await pool.query(
            `INSERT INTO comentarios (animal_id, usuario_id, comentario)
             VALUES ($1, $2, $3)
             RETURNING id`,
            [id, usuario_id, comentario]
        );
        
        res.status(201).json({
            success: true,
            message: 'Comentário adicionado!',
            data: { id: result.rows[0].id }
        });
        
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao adicionar comentário',
            error: error.message
        });
    }
});

// GET - Buscar similares
router.get('/:id/similares', async (req, res) => {
    try {
        const { id } = req.params;
        const { raio = 50 } = req.query;
        
        const result = await pool.query(
            'SELECT * FROM buscar_similares($1, $2)',
            [id, raio]
        );
        
        res.json({
            success: true,
            data: result.rows
        });
        
    } catch (error) {
        console.error('Erro ao buscar similares:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar animais similares',
            error: error.message
        });
    }
});

module.exports = router;
