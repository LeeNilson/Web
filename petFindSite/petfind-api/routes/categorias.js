const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET - Listar todas as categorias
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM categorias ORDER BY nome'
        );
        
        res.json({
            success: true,
            data: result.rows
        });
        
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar categorias',
            error: error.message
        });
    }
});

// GET - Buscar categoria por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query(
            'SELECT * FROM categorias WHERE id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Categoria não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: result.rows[0]
        });
        
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar categoria',
            error: error.message
        });
    }
});

// GET - Listar raças por categoria
router.get('/:id/racas', async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query(
            'SELECT * FROM racas WHERE categoria_id = $1 ORDER BY nome',
            [id]
        );
        
        res.json({
            success: true,
            data: result.rows
        });
        
    } catch (error) {
        console.error('Erro ao listar raças:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar raças',
            error: error.message
        });
    }
});

// GET - Listar todas as raças
router.get('/racas/todas', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT r.*, c.nome as categoria_nome
             FROM racas r
             INNER JOIN categorias c ON r.categoria_id = c.id
             ORDER BY c.nome, r.nome`
        );
        
        res.json({
            success: true,
            data: result.rows
        });
        
    } catch (error) {
        console.error('Erro ao listar raças:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar raças',
            error: error.message
        });
    }
});

// GET - Estatísticas por categoria
router.get('/:id/estatisticas', async (req, res) => {
    try {
        const { id } = req.params;
        
        const query = `
            SELECT 
                COUNT(*) FILTER (WHERE tipo_anuncio = 'perdido' AND status = 'ativo') as perdidos,
                COUNT(*) FILTER (WHERE tipo_anuncio = 'encontrado' AND status = 'ativo') as encontrados,
                COUNT(*) FILTER (WHERE status = 'reunido') as reunidos,
                COUNT(*) as total
            FROM animais
            WHERE categoria_id = $1
        `;
        
        const result = await pool.query(query, [id]);
        
        res.json({
            success: true,
            data: result.rows[0]
        });
        
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar estatísticas',
            error: error.message
        });
    }
});

module.exports = router;