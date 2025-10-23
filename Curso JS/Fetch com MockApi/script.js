
    const baseURL = "https://68ddb9d3d7b591b4b78d3b7e.mockapi.io/api/v1/users";
    const form = document.getElementById('userForm');
    const usersList = document.getElementById('usersList');

    // Função para formatar data
    function formatarData(dataString) {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }

    function carregarUsuarios() {
      usersList.innerHTML = '<div class="loading">Carregando usuários...</div>';
      
      fetch(baseURL)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          usersList.innerHTML = '';

          if (!Array.isArray(data) || data.length === 0) {
            usersList.innerHTML = '<div class="loading">Nenhum usuário cadastrado</div>';
            return;
          }

          data.forEach(user => {
            const template = document.getElementById('userCardTemplate');
            
            const userCard = template.content.cloneNode(true);
            
            const nameEl = userCard.querySelector('.user-name');
            if (nameEl) nameEl.textContent = user.name;
            const avatarEl = userCard.querySelector('.user-avatar');
            if (avatarEl) {
              avatarEl.src = user.avatar;
              avatarEl.alt = `Avatar de ${user.name}`;
            }
            const idEl = userCard.querySelector('.user-id');
            if (idEl) idEl.textContent = `ID: ${user.id}`;
            const dateEl = userCard.querySelector('.user-date');
            if (dateEl) dateEl.textContent = `Criado em: ${formatarData(user.createdAt)}`;
            
            const btnEdit = userCard.querySelector('.btn-edit');
            const btnDelete = userCard.querySelector('.btn-delete');
            
            if (btnEdit) btnEdit.addEventListener('click', () => editarUsuario(user));
            if (btnDelete) btnDelete.addEventListener('click', () => deletarUsuario(user.id));
            
            usersList.appendChild(userCard);
          });
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }

    function editarUsuario(user) {
      document.getElementById('userId').value = user.id;
      document.getElementById('name').value = user.name;
      document.getElementById('avatar').value = user.avatar;
      
    }

    function deletarUsuario(id) {
      if (!confirm('Tem certeza que deseja deletar este usuário?')) {
        return;
      }

      fetch(`${baseURL}/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao deletar usuário: ' + response.statusText);
          }
          return response.json();
        })
        .then(() => {
          console.log('Usuário deletado com sucesso');
          carregarUsuarios();
        })
        .catch(error => {
          console.error('Erro ao deletar:', error);
          alert('Erro ao deletar usuário');
        });
    }

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const userId = document.getElementById('userId').value;
      const nome = document.getElementById('name').value;
      const urlimg = document.getElementById('avatar').value;

      const dados = {
        name: nome,
        avatar: urlimg
      };

      const url = userId ? `${baseURL}/${userId}` : baseURL;
      const method = userId ? 'PUT' : 'POST';
     
      console.log('User ID:', userId || 'N/A (Criando novo)');
      console.log('Método:', method);
      console.log('URL:', url);
      console.log('Dados enviados:', dados);

      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log('Operação realizada com sucesso:', data);
          form.reset();
          carregarUsuarios();
        })

    });
    carregarUsuarios();

    
