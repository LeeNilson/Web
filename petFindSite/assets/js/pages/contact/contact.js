// ========== CONTACT FORM - ENVIAR DADOS EM JSON ==========

// Configuração da API
const API_URL = 'http://localhost:3000/';

// Pegar o formulário
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Pegar os valores dos campos
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim()
        };

        // Validação básica no frontend
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }

        // Validar termos
        const termsAccepted = document.getElementById('terms').checked;
        if (!termsAccepted) {
            showMessage('Você precisa aceitar os termos e condições.', 'error');
            return;
        }

        // Desabilitar botão durante envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        submitBtn.classList.add('btn-loading');

        try {
            // Enviar requisição POST em JSON
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Converter resposta para JSON
            const data = await response.json();

            if (response.ok && data.success) {
                // Sucesso
                showMessage(data.message || 'Mensagem enviada com sucesso!', 'success');
                contactForm.reset(); // Limpar formulário
            } else {
                // Erro da API
                showMessage(data.message || 'Erro ao enviar mensagem.', 'error');
            }

        } catch (error) {
            // Erro de rede ou servidor
            console.error('Erro:', error);
            showMessage('Erro ao conectar com o servidor. Tente novamente.', 'error');
        } finally {
            // Reabilitar botão
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('btn-loading');
        }
    });
}

// ========== FUNÇÃO PARA MOSTRAR MENSAGENS ==========
function showMessage(message, type = 'info') {
    // Remover mensagens anteriores
    const existingAlert = document.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Criar elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-message alert-${type} animate-slide-in-down`;
    alertDiv.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: 500;
        max-width: 500px;
        width: 90%;
        text-align: center;
    `;

    // Cores baseadas no tipo
    if (type === 'success') {
        alertDiv.style.backgroundColor = '#10b981';
        alertDiv.style.color = '#ffffff';
    } else if (type === 'error') {
        alertDiv.style.backgroundColor = '#ef4444';
        alertDiv.style.color = '#ffffff';
    } else {
        alertDiv.style.backgroundColor = '#3b82f6';
        alertDiv.style.color = '#ffffff';
    }

    alertDiv.textContent = message;

    // Adicionar ao body
    document.body.appendChild(alertDiv);

    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        alertDiv.style.transform = 'translateX(-50%) translateY(-20px)';
        alertDiv.style.transition = 'all 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
}

// ========== VALIDAÇÃO EM TEMPO REAL ==========
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            
            // Mostrar mensagem de erro
            let errorMsg = this.parentElement.querySelector('.form-feedback');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'form-feedback invalid';
                errorMsg.textContent = 'Email inválido';
                this.parentElement.appendChild(errorMsg);
            }
        } else if (this.value) {
            this.classList.add('is-valid');
            this.classList.remove('is-invalid');
            
            // Remover mensagem de erro
            const errorMsg = this.parentElement.querySelector('.form-feedback');
            if (errorMsg) errorMsg.remove();
        }
    });
}

// ========== LOG PARA DEBUG ==========
console.log('📧 Contact form script carregado');
console.log('🔗 API URL:', API_URL);