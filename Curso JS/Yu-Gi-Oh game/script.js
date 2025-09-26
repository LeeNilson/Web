// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os cards e elementos importantes
    const cards = document.querySelectorAll('.card');
    const cemiterioConteudo = document.getElementById('cemiterio-conteudo');
    const infoElement = document.getElementById('info');
    
    // Array para controlar cards removidos (evitar duplicatas)
    const monstrosRemovidos = [];
  

    
    // Adiciona eventos de clique para cada card
    cards.forEach(card => {
        card.addEventListener('click', function() {
            ativarCard(this);
        });
        
        // Adiciona evento para o botão remover
        const btnRemover = card.querySelector('.btn-remover');
        btnRemover.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que o clique no botão ative o card
            removerCard(card);
        });
    });
    
const cards = document.querySelectorAll('.card');
const cemiterioConteudo = document.getElementById('cemiterio-conteudo');
const infoElement = document.getElementById('info');

// ADICIONA O BOTÃO REMOVER EM CADA CARD (caso não exista)
cards.forEach(card => {
    if (!card.querySelector('.btn-remover')) {
        const btn = document.createElement('button');
        btn.className = 'btn-remover';
        btn.textContent = 'Remover';
        card.appendChild(btn);
    }
});

    // Função para ativar um card (revelar monstro)
    function ativarCard(card) {
        // Remove classe ativa de todos os cards
        cards.forEach(c => c.classList.remove('card-ativo'));
        
        // Adiciona classe ativa ao card clicado
        card.classList.add('card-ativo');
        
        // Pega os dados do monstro
        const imgMonstro = card.dataset.img;
        const atk = card.dataset.atk;
        const def = card.dataset.def;
        
        // Encontra elementos dentro do card
        const imgElement = card.querySelector('.card-virado');
        const statsElement = card.querySelector('.stats');
        const atkSpan = card.querySelector('.atk');
        const defSpan = card.querySelector('.def');
        
        // Revela a imagem do monstro
        imgElement.src = imgMonstro;
        imgElement.alt = card.querySelector('h3').textContent;
        
        // Atualiza os valores de ATK e DEF
        atkSpan.textContent = atk;
        defSpan.textContent = def;
        
        // Mostra as estatísticas
        statsElement.style.display = 'block';
        
        // Atualiza a mensagem informativa
        infoElement.textContent = `${card.querySelector('h3').textContent} foi invocado! ATK: ${atk} / DEF: ${def}`;
    }
    
    // Função para remover um card e enviá-lo ao cemitério
    function removerCard(card) {
        const nomeCard = card.querySelector('h3').textContent;
        const imgMonstro = card.dataset.img;
        const monstroId = card.dataset.monstro;
        
        // Verifica se o monstro já foi removido
        if (monstrosRemovidos.includes(monstroId)) {
            infoElement.textContent = `${nomeCard} já está no cemitério!`;
            return;
        }
        
        // Verifica se o card está ativo (revelado)
        if (!card.classList.contains('card-ativo')) {
            infoElement.textContent = 'Você precisa revelar o card antes de removê-lo!';
            return;
        }
        
        // Adiciona o monstro à lista de removidos
        monstrosRemovidos.push(monstroId);
        
        // Cria elemento para o cemitério
        const monstroNoCemiterio = document.createElement('div');
        monstroNoCemiterio.className = 'monstro-cemiterio';
        monstroNoCemiterio.style.cssText = `
            text-align: center;
            margin: 5px;
            padding: 8px;
            background: #333;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            transition: transform 0.2s;
        `;
        
        // Adiciona hover effect
        monstroNoCemiterio.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        monstroNoCemiterio.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Cria imagem para o cemitério
        const imgCemiterio = document.createElement('img');
        imgCemiterio.src = imgMonstro;
        imgCemiterio.alt = nomeCard;
        imgCemiterio.style.cssText = `
            width: 60px;
            height: 80px;
            object-fit: contain;
            border-radius: 4px;
        `;
        
        // Cria nome para o cemitério
        const nomeCemiterio = document.createElement('p');
        nomeCemiterio.textContent = nomeCard;
        nomeCemiterio.style.cssText = `
            font-size: 10px;
            margin: 5px 0 0 0;
            color: #fffad1;
            word-wrap: break-word;
        `;
        
        // Adiciona elementos ao card do cemitério
        monstroNoCemiterio.appendChild(imgCemiterio);
        monstroNoCemiterio.appendChild(nomeCemiterio);
        
        // Adiciona ao cemitério com animação
        cemiterioConteudo.appendChild(monstroNoCemiterio);
        
        // Animação de entrada
        monstroNoCemiterio.style.opacity = '0';
        monstroNoCemiterio.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            monstroNoCemiterio.style.transition = 'opacity 0.5s, transform 0.5s';
            monstroNoCemiterio.style.opacity = '1';
            monstroNoCemiterio.style.transform = 'translateY(0)';
        }, 50);
        
        // Remove o card da área de jogo com animação
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.8)';
        card.style.pointerEvents = 'none';
        
        // Atualiza a mensagem informativa
        infoElement.textContent = `${nomeCard} foi derrotado e enviado ao cemitério!`;
        
        // Verifica se todos os monstros foram removidos
        setTimeout(() => {
            const cardsAtivos = document.querySelectorAll('.card:not([style*="opacity: 0.3"])');
            if (cardsAtivos.length === 0) {
                infoElement.textContent = 'Todos os monstros foram derrotados! O duelo acabou.';
            }
        }, 600);
    }
    
    // Adiciona suporte para navegação por teclado
    cards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                ativarCard(this);
            }
        });
    });
    
    // Adiciona estilo CSS para card ativo dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        .card-ativo {
            border: 3px solid #ffd700 !important;
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.6) !important;
            transform: translateY(-5px);
            transition: all 0.3s ease;
        }
        
        .card {
            transition: all 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        
        .btn-remover:hover {
            background: #aa2222 !important;
            transform: scale(1.05);
            transition: all 0.2s;
        }
        
        #cemiterio {
            border: 2px solid #444;
        }
        
        #cemiterio h3 {
            border-bottom: 1px solid #444;
            padding-bottom: 5px;
        }
    `;
    
    document.head.appendChild(style);
    
    console.log('Yu-Gi-Oh! Cards Interactive carregado com sucesso!');
});