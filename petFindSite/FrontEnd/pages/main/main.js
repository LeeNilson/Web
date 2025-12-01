        const API_URL = 'http://localhost:3000/api';
        let paginaAtual = 1;

        // Carregar estatísticas
        async function carregarEstatisticas() {
            try {
                const response = await fetch(`${API_URL}/animais?page=1&limit=1000`);
                const data = await response.json();
                
                if (data.success) {
                    const perdidos = data.data.filter(a => a.tipo_anuncio === 'perdido').length;
                    const encontrados = data.data.filter(a => a.tipo_anuncio === 'encontrado').length;
                    
                    document.getElementById('total-perdidos').textContent = perdidos;
                    document.getElementById('total-encontrados').textContent = encontrados;
                    document.getElementById('total-reunidos').textContent = Math.floor(Math.random() * 50) + 10;
                }
            } catch (error) {
                console.error('Erro ao carregar estatísticas:', error);
            }
        }

        // Carregar categorias
        async function carregarCategorias() {
            try {
                const response = await fetch(`${API_URL}/categorias`);
                const data = await response.json();
                
                const select = document.getElementById('filtro-categoria');
                data.data.forEach(cat => {
                    const option = document.createElement('option');
                    option.value = cat.id;
                    option.textContent = cat.nome;
                    select.appendChild(option);
                });
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            }
        }

        // Buscar animais
        async function buscarAnimais(page = 1) {
            try {
                paginaAtual = page;
                const container = document.getElementById('animais-container');
                container.innerHTML = '<div class="loading">Carregando animais</div>';

                const tipo = document.getElementById('filtro-tipo').value;
                const categoria = document.getElementById('filtro-categoria').value;
                const cidade = document.getElementById('filtro-cidade').value;
                const estado = document.getElementById('filtro-estado').value;

                let url = `${API_URL}/animais?page=${page}&limit=12`;
                if (tipo) url += `&tipo=${tipo}`;
                if (categoria) url += `&categoria=${categoria}`;
                if (cidade) url += `&cidade=${cidade}`;
                if (estado) url += `&estado=${estado.toUpperCase()}`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.success) {
                    exibirAnimais(data.data);
                    criarPaginacao(data.pagination);
                } else {
                    container.innerHTML = '<div class="empty-state"><h3>Erro ao carregar animais</h3></div>';
                }
            } catch (error) {
                console.error('Erro ao buscar animais:', error);
                document.getElementById('animais-container').innerHTML = 
                    '<div class="empty-state"><h3>Erro ao carregar dados</h3></div>';
            }
        }

        // Exibir animais
        function exibirAnimais(animais) {
            const container = document.getElementById('animais-container');

            if (!animais || animais.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <h3>😔 Nenhum animal encontrado</h3>
                        <p>Tente ajustar os filtros de busca</p>
                    </div>
                `;
                return;
            }

            const grid = document.createElement('div');
            grid.className = 'animais-grid';

            animais.forEach(animal => {
                const card = criarCardAnimal(animal);
                grid.appendChild(card);
            });

            container.innerHTML = '';
            container.appendChild(grid);
        }

        // Criar card do animal
        function criarCardAnimal(animal) {
            const card = document.createElement('div');
            card.className = 'animal-card';
            card.onclick = () => verDetalhes(animal.id);

            const badgeClass = animal.tipo_anuncio === 'perdido' ? 'badge-perdido' : 'badge-encontrado';
            const fotoUrl = animal.foto ? `http://localhost:3000/uploads/${animal.foto}` : 'https://via.placeholder.com/300x250?text=Sem+Foto';

            card.innerHTML = `
                <img src="${fotoUrl}" alt="${animal.nome || 'Animal'}" class="animal-foto" 
                     onerror="this.src='https://via.placeholder.com/300x250?text=Sem+Foto'">
                <div class="animal-content">
                    <div class="badges">
                        <span class="badge ${badgeClass}">${animal.tipo_anuncio.toUpperCase()}</span>
                        ${animal.recompensa ? `<span class="badge badge-recompensa">R$ ${animal.recompensa}</span>` : ''}
                    </div>
                    <h3>${animal.nome || 'Sem nome'}</h3>
                    <p class="animal-info">
                        <strong>${animal.categoria}</strong> ${animal.raca ? '- ' + animal.raca : ''}<br>
                        ${animal.sexo ? animal.sexo.charAt(0).toUpperCase() + animal.sexo.slice(1) : ''} 
                        ${animal.porte ? '| ' + animal.porte.charAt(0).toUpperCase() + animal.porte.slice(1) : ''}<br>
                        📍 ${animal.cidade}, ${animal.estado}<br>
                        📅 ${new Date(animal.data_ocorrencia).toLocaleDateString('pt-BR')}
                    </p>
                    <p class="animal-descricao">
                        ${animal.descricao.substring(0, 100)}${animal.descricao.length > 100 ? '...' : ''}
                    </p>
                    <div class="animal-footer">
                        <span>👁️ ${animal.visualizacoes} visualizações</span>
                        <button class="contato-btn" onclick="event.stopPropagation(); verDetalhes(${animal.id})">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            `;

            return card;
        }

        // Ver detalhes do animal
        async function verDetalhes(id) {
            try {
                const response = await fetch(`${API_URL}/animais/${id}`);
                const result = await response.json();

                if (result.success) {
                    const animal = result.data;
                    const modal = document.getElementById('modal-detalhes');
                    const content = document.getElementById('detalhes-content');

                    const fotoUrl = animal.fotos && animal.fotos[0] 
                        ? `http://localhost:3000/uploads/${animal.fotos[0].caminho_foto}`
                        : 'https://via.placeholder.com/600x400?text=Sem+Foto';

                    content.innerHTML = `
                        <h2>${animal.nome || 'Animal sem nome'}</h2>
                        <img src="${fotoUrl}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin: 1rem 0;">
                        
                        <h3>Informações</h3>
                        <p><strong>Tipo:</strong> ${animal.tipo_anuncio === 'perdido' ? 'Perdido' : 'Encontrado'}</p>
                        <p><strong>Categoria:</strong> ${animal.categoria}</p>
                        <p><strong>Raça:</strong> ${animal.raca || 'Não especificada'}</p>
                        <p><strong>Sexo:</strong> ${animal.sexo || 'Desconhecido'}</p>
                        <p><strong>Porte:</strong> ${animal.porte || 'Não especificado'}</p>
                        <p><strong>Cor:</strong> ${animal.cor_principal || 'Não especificada'}</p>
                        ${animal.recompensa ? `<p><strong>Recompensa:</strong> R$ ${animal.recompensa}</p>` : ''}
                        
                        <h3>Local e Data</h3>
                        <p><strong>Data:</strong> ${new Date(animal.data_ocorrencia).toLocaleDateString('pt-BR')}</p>
                        <p><strong>Local:</strong> ${animal.cidade}, ${animal.estado}</p>
                        ${animal.bairro ? `<p><strong>Bairro:</strong> ${animal.bairro}</p>` : ''}
                        
                        <h3>Descrição</h3>
                        <p>${animal.descricao}</p>
                        
                        <h3>Contato</h3>
                        <p><strong>Nome:</strong> ${animal.nome_usuario}</p>
                        ${animal.celular ? `<p><strong>Celular:</strong> ${animal.celular}</p>` : ''}
                        ${animal.telefone ? `<p><strong>Telefone:</strong> ${animal.telefone}</p>` : ''}
                    `;

                    modal.classList.add('active');
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes:', error);
                alert('Erro ao carregar detalhes do animal');
            }
        }

        // Fechar modal
        function fecharModal() {
            document.getElementById('modal-detalhes').classList.remove('active');
        }

        // Criar paginação
        function criarPaginacao(pagination) {
            const container = document.getElementById('pagination');
            container.innerHTML = '';

            if (pagination.totalPages <= 1) return;

            // Botão anterior
            if (pagination.page > 1) {
                const btnPrev = document.createElement('button');
                btnPrev.textContent = '← Anterior';
                btnPrev.onclick = () => buscarAnimais(pagination.page - 1);
                container.appendChild(btnPrev);
            }

            // Números das páginas
            for (let i = 1; i <= pagination.totalPages; i++) {
                if (i === 1 || i === pagination.totalPages || 
                    (i >= pagination.page - 1 && i <= pagination.page + 1)) {
                    const btn = document.createElement('button');
                    btn.textContent = i;
                    btn.className = i === pagination.page ? 'active' : '';
                    btn.onclick = () => buscarAnimais(i);
                    container.appendChild(btn);
                } else if (i === pagination.page - 2 || i === pagination.page + 2) {
                    const span = document.createElement('span');
                    span.textContent = '...';
                    span.style.color = 'white';
                    container.appendChild(span);
                }
            }

            // Botão próximo
            if (pagination.page < pagination.totalPages) {
                const btnNext = document.createElement('button');
                btnNext.textContent = 'Próximo →';
                btnNext.onclick = () => buscarAnimais(pagination.page + 1);
                container.appendChild(btnNext);
            }
        }

        // Fechar modal ao clicar fora
        window.onclick = (event) => {
            const modal = document.getElementById('modal-detalhes');
            if (event.target === modal) {
                fecharModal();
            }
        };

        // Inicializar
        document.addEventListener('DOMContentLoaded', () => {
            carregarEstatisticas();
            carregarCategorias();
            buscarAnimais(1);
        });
