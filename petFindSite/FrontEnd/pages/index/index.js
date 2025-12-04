// Array para armazenar as fotos
let uploadedPhotos = [];

// Elementos do DOM
const photoInput = document.getElementById('photo-input');
const uploadContainer = document.getElementById('upload-container');
const photosPreview = document.getElementById('photos-preview');
const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('results-container');


function displayPhoto(photo) {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    photoItem.dataset.id = photo.id;
    
    photoItem.innerHTML = `
        <img src="${photo.src}" alt="${photo.name}">
        <button class="photo-remove" onclick="removePhoto(${photo.id})" title="Remover foto">×</button>
    `;
    
    photosPreview.appendChild(photoItem);
}

function removePhoto(photoId) {
   
    uploadedPhotos = uploadedPhotos.filter(photo => photo.id !== photoId);
    const photoItem = document.querySelector(`.photo-item[data-id="${photoId}"]`);
    if (photoItem) {
        photoItem.remove();
    }
}

const searchInput = document.getElementById('search-input'); 

// Busca de pets
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const query = searchInput.value;
    
    if (query.trim() === '') {
        alert('Por favor, digite algo para buscar!');
        return;
    }
    
    searchPets(query);
});

async function searchPets(query) {
    resultsContainer.innerHTML = '<p>Buscando pets na API...</p>';
    
    try {
        const response = await fetch('http://localhost:3000/animais');
            if (!response.ok) throw new Error('Erro na API');
            const allPets = await response.json();
            const filteredResults = allPets.filter(pet => {
                const searchTerm = query.toLowerCase();
                return (
                    pet.nomeanimal.toLowerCase().includes(searchTerm) ||
                    pet.tipoanimal.toLowerCase().includes(searchTerm) ||
                    pet.descricao.toLowerCase().includes(searchTerm)
                );
            });
        
        displayResults(filteredResults);

    } catch (error) {
        console.error('Erro:', error);
        resultsContainer.innerHTML = '<p style="color: red;">Erro ao carregar dados.</p>';
    }
}

// 2. Função de exibição ajustada para o novo JSON
function displayResults(results) {
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhum pet encontrado.</p>';
        return;
    }
    
    resultsContainer.innerHTML = results.map(pet => {
        // Lógica para imagem provisória (já que o JSON não tem foto)
        let imagemPadrao = 'https://via.placeholder.com/300?text=Pet';
        if(pet.tipoanimal.toLowerCase() === 'cachorro') imagemPadrao = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300';
        if(pet.tipoanimal.toLowerCase() === 'gato') imagemPadrao = 'https://images.unsplash.com/photo-1529778873920-4da4926a7071?w=300';

        // Formata a data (de 2025-01-10... para 10/01/2025)
        const dataFormatada = new Date(pet.datadesaparecimento).toLocaleDateString('pt-BR');

        return `
        <div class="pet-card">
            <img src="${imagemPadrao}" alt="${pet.nomeanimal}">
            <div class="pet-info">
                <h3>${pet.nomeanimal} <small>(${pet.status})</small></h3>
                
                <p><strong>Tipo:</strong> ${pet.tipoanimal}</p>
                <p><strong>Descrição:</strong> ${pet.descricao}</p>
                <p><strong>Desapareceu em:</strong> ${dataFormatada}</p>
                
                <p><strong>Local:</strong> Endereço cód. ${pet.idendereco}</p>
                
                <button class="contact-button" onclick="alert('Contatar tutor ${pet.tutorid}')">
                    Entrar em Contato
                </button>
            </div>
        </div>
    `}).join('');
}