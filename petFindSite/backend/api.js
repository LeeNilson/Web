const API_BASE_URL = 'http://localhost:3000/api';

// Classe para gerenciar requisições à API
class PetFinderAPI {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Método auxiliar para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }

  // ============================================
  // MÉTODOS CRUD
  // ============================================

  // GET - Listar todos os pets
  async getAllPets() {
    return this.request('/pets');
  }

  // GET - Buscar pet por ID
  async getPetById(id) {
    return this.request(`/pets/${id}`);
  }

  // GET - Buscar pets por status
  async getPetsByStatus(status) {
    return this.request(`/pets/status/${status}`);
  }

  // GET - Buscar pets por espécie
  async getPetsBySpecies(species) {
    return this.request(`/pets/species/${species}`);
  }

  // POST - Criar novo pet
  async createPet(petData) {
    return this.request('/pets', {
      method: 'POST',
      body: JSON.stringify(petData),
    });
  }

  // PUT - Atualizar pet completo
  async updatePet(id, petData) {
    return this.request(`/pets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(petData),
    });
  }

  // PATCH - Atualizar campos específicos
  async updatePetPartial(id, updates) {
    return this.request(`/pets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // DELETE - Remover pet
  async deletePet(id) {
    return this.request(`/pets/${id}`, {
      method: 'DELETE',
    });
  }

  // Verificar saúde da API
  async checkHealth() {
    return this.request('/health');
  }
}

// Instância global da API
const petAPI = new PetFinderAPI();

// ============================================
// FUNÇÕES DE INTERFACE - EXEMPLOS DE USO
// ============================================

// Carregar e exibir todos os pets
async function loadAllPets() {
  try {
    showLoading();
    const response = await petAPI.getAllPets();
    displayPets(response.data);
    hideLoading();
  } catch (error) {
    showError('Erro ao carregar pets: ' + error.message);
    hideLoading();
  }
}

// Carregar pets perdidos
async function loadLostPets() {
  try {
    const response = await petAPI.getPetsByStatus('perdido');
    displayPets(response.data);
  } catch (error) {
    showError('Erro ao carregar pets perdidos: ' + error.message);
  }
}

// Carregar pets encontrados
async function loadFoundPets() {
  try {
    const response = await petAPI.getPetsByStatus('encontrado');
    displayPets(response.data);
  } catch (error) {
    showError('Erro ao carregar pets encontrados: ' + error.message);
  }
}

// Criar novo pet (formulário)
async function handleCreatePet(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const petData = {
    name: formData.get('name'),
    species: formData.get('species'),
    breed: formData.get('breed'),
    color: formData.get('color'),
    size: formData.get('size'),
    status: formData.get('status'),
    description: formData.get('description'),
    location: formData.get('location'),
    contact_name: formData.get('contact_name'),
    contact_phone: formData.get('contact_phone'),
    contact_email: formData.get('contact_email'),
    photo_url: formData.get('photo_url'),
  };

  try {
    showLoading();
    const response = await petAPI.createPet(petData);
    showSuccess('Pet cadastrado com sucesso!');
    event.target.reset();
    loadAllPets(); // Recarregar lista
    hideLoading();
  } catch (error) {
    showError('Erro ao cadastrar pet: ' + error.message);
    hideLoading();
  }
}

// Atualizar pet
async function handleUpdatePet(id, petData) {
  try {
    showLoading();
    const response = await petAPI.updatePet(id, petData);
    showSuccess('Pet atualizado com sucesso!');
    loadAllPets(); // Recarregar lista
    hideLoading();
  } catch (error) {
    showError('Erro ao atualizar pet: ' + error.message);
    hideLoading();
  }
}

// Atualizar status do pet (exemplo de PATCH)
async function updatePetStatus(petId, newStatus) {
  try {
    showLoading();
    const response = await petAPI.updatePetPartial(petId, { status: newStatus });
    showSuccess(`Status atualizado para: ${newStatus}`);
    loadAllPets(); // Recarregar lista
    hideLoading();
  } catch (error) {
    showError('Erro ao atualizar status: ' + error.message);
    hideLoading();
  }
}

// Deletar pet com confirmação
async function handleDeletePet(petId, petName) {
  const confirmed = confirm(`Tem certeza que deseja remover ${petName}?`);
  
  if (!confirmed) return;

  try {
    showLoading();
    const response = await petAPI.deletePet(petId);
    showSuccess('Pet removido com sucesso!');
    loadAllPets(); // Recarregar lista
    hideLoading();
  } catch (error) {
    showError('Erro ao remover pet: ' + error.message);
    hideLoading();
  }
}

// ============================================
// FUNÇÕES DE UI
// ============================================

// Exibir pets na tela
function displayPets(pets) {
  const container = document.getElementById('pets-container');
  
  if (!pets || pets.length === 0) {
    container.innerHTML = '<p class="no-pets">Nenhum pet encontrado</p>';
    return;
  }

  container.innerHTML = pets.map(pet => `
    <div class="pet-card" data-id="${pet.id}">
      ${pet.photo_url ? `<img src="${pet.photo_url}" alt="${pet.name}" class="pet-photo">` : '<div class="no-photo">Sem foto</div>'}
      <div class="pet-info">
        <h3>${pet.name}</h3>
        <p><strong>Espécie:</strong> ${pet.species}</p>
        ${pet.breed ? `<p><strong>Raça:</strong> ${pet.breed}</p>` : ''}
        <p><strong>Status:</strong> <span class="status-badge status-${pet.status}">${pet.status}</span></p>
        <p><strong>Local:</strong> ${pet.location || 'Não informado'}</p>
        <p class="description">${pet.description || ''}</p>
        <div class="contact">
          <p><strong>Contato:</strong> ${pet.contact_phone}</p>
        </div>
        <div class="pet-actions">
          <button onclick="viewPetDetails(${pet.id})" class="btn-view">Ver Detalhes</button>
          <button onclick="editPet(${pet.id})" class="btn-edit">Editar</button>
          <button onclick="handleDeletePet(${pet.id}, '${pet.name}')" class="btn-delete">Remover</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Funções de feedback
function showLoading() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'block';
}

function hideLoading() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
}

function showSuccess(message) {
  alert(message); // Substitua por um toast/notification mais elaborado
}

function showError(message) {
  alert(message); // Substitua por um toast/notification mais elaborado
}

// Ver detalhes do pet
async function viewPetDetails(petId) {
  try {
    const response = await petAPI.getPetById(petId);
    const pet = response.data;
    
    // Mostrar modal com detalhes (implemente seu modal aqui)
    alert(`Detalhes de ${pet.name}\n\nEspécie: ${pet.species}\nStatus: ${pet.status}\nContato: ${pet.contact_phone}`);
  } catch (error) {
    showError('Erro ao carregar detalhes: ' + error.message);
  }
}

// Editar pet (carregar dados no formulário)
async function editPet(petId) {
  try {
    const response = await petAPI.getPetById(petId);
    const pet = response.data;
    
    // Preencher formulário de edição (implemente conforme seu formulário)
    document.getElementById('edit-pet-id').value = pet.id;
    document.getElementById('edit-name').value = pet.name;
    document.getElementById('edit-species').value = pet.species;
    // ... preencher outros campos
    
    // Mostrar modal/seção de edição
    document.getElementById('edit-section').style.display = 'block';
  } catch (error) {
    showError('Erro ao carregar pet para edição: ' + error.message);
  }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

// Quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  // Carregar todos os pets
  loadAllPets();

  // Configurar event listeners para formulários
  const createForm = document.getElementById('create-pet-form');
  if (createForm) {
    createForm.addEventListener('submit', handleCreatePet);
  }

  // Filtros
  const lostPetsBtn = document.getElementById('filter-lost');
  if (lostPetsBtn) {
    lostPetsBtn.addEventListener('click', loadLostPets);
  }

  const foundPetsBtn = document.getElementById('filter-found');
  if (foundPetsBtn) {
    foundPetsBtn.addEventListener('click', loadFoundPets);
  }

  const allPetsBtn = document.getElementById('filter-all');
  if (allPetsBtn) {
    allPetsBtn.addEventListener('click', loadAllPets);
  }
});