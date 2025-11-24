// ========== CONTROLLER: CONTACT (Contato) ==========

class ContactController {
    
    // ========== POST: Enviar mensagem de contato ==========
    async store(req, res) {
        try {
            const { name, email, subject, message } = req.body;

            // Validar campos obrigatórios
            if (!name || !email || !subject || !message) {
                return res.status(400).json({
                    success: false,
                    message: 'Todos os campos são obrigatórios',
                    missingFields: {
                        name: !name,
                        email: !email,
                        subject: !subject,
                        message: !message
                    }
                });
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Email inválido'
                });
            }

            // Simular salvamento (em produção, salve no banco ou envie email)
            const contactData = {
                id: Date.now(), // ID temporário
                name,
                email,
                subject,
                message,
                status: 'pending', // pending, read, replied
                createdAt: new Date()
            };

            // Log no servidor (em produção, salve no banco)
            console.log('📧 Nova mensagem de contato recebida:');
            console.log('Nome:', name);
            console.log('Email:', email);
            console.log('Assunto:', subject);
            console.log('Mensagem:', message);

            // Resposta de sucesso
            res.status(201).json({
                success: true,
                message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
                data: contactData
            });

        } catch (error) {
            console.error('Erro ao processar contato:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao enviar mensagem',
                error: error.message
            });
        }
    }

    // ========== GET: Listar mensagens (apenas para admin) ==========
    async index(req, res) {
        try {
            // Em produção, buscar do banco de dados
            res.status(200).json({
                success: true,
                message: 'Funcionalidade disponível em breve',
                data: []
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar mensagens',
                error: error.message
            });
        }
    }
}

module.exports = new ContactController();