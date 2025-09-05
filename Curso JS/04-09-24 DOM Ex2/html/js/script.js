      const imagemPrincipal = document.getElementById('imagem-principal');
        const tituloProject = document.getElementById('titulo-projeto');
        const descricaoProject = document.getElementById('descricao-projeto');
        const linkProject = document.querySelector('.link-projeto');
        imagemPrincipal.src = 'https://via.placeholder.com/400x300/667eea/white?text=Projeto+Atualizado';
        
        const miniaturas = document.querySelectorAll('.miniatura');
        
        miniaturas.forEach(miniatura => {
            miniatura.addEventListener('click', function() {

                miniaturas.forEach(m => m.classList.remove('ativa'));
                
                this.classList.add('ativa');
                
                imagemPrincipal.src = this.src;
                
                tituloProject.textContent = this.getAttribute('data-titulo');
                
                descricaoProject.textContent = this.getAttribute('data-descricao');
                
                const novoLink = this.getAttribute('data-link');
                if (novoLink) {
                    linkProject.href = novoLink;
                }
            });
        });
        
        const btnDarkMode = document.getElementById('btn-dark-mode');
        const body = document.querySelector('body');
        
        btnDarkMode.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
           
        })
        
         window.addEventListener('load', function() {
            document.querySelectorAll('.galeria-principal, .galeria-miniaturas').forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    el.style.transition = 'all 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });