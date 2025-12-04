const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    // Espera-se o formato: Bearer token_aqui
    const [, token] = authHeader.split(" ");

    if (!token) {
        return res.status(401).json({ message: "Token inválido" });
    }

    try {
        const secret = process.env.JWT_SECRET || "segredo_super_forte";
        const decoded = jwt.verify(token, secret);

        // Salva os dados decodificados do usuário para uso posterior
        req.user = decoded;

        next(); // segue para o próximo middleware
    } catch (err) {
        return res.status(403).json({ message: "Token inválido ou expirado" });
    }
};
