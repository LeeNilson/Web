        function switchTab(tabName) {
            // Esconder todas as abas
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remover classe active dos botões
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Mostrar aba selecionada
            document.getElementById(tabName + '-tab').classList.add('active');
            
            // Adicionar classe active ao botão
            event.target.classList.add('active');
        }
