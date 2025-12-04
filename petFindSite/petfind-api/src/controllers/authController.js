const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Busca usuário na tabela tutores (ou outra tabela desejada)
        const result = await pool.query(
            "SELECT * FROM tutores WHERE email = $1 LIMIT 1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Usuário não encontrado" });
        }

        const user = result.rows[0];

        // Verifica senha
        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        // Gera token
        const secret = process.env.JWT_SECRET || "segredo_super_forte";
        const token = jwt.sign(
            { id: user.id, nome: user.nome, email: user.email },
            secret,
            { expiresIn: "8h" }
        );

        return res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no login" });
    }
};
