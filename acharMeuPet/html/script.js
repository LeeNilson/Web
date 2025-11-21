// Array para armazenar as fotos
let uploadedPhotos = [];

// Elementos do DOM
const photoInput = document.getElementById('photo-input');
const uploadContainer = document.getElementById('upload-container');
const photosPreview = document.getElementById('photos-preview');
const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('results-container');

// Event listener para seleção de arquivos
photoInput.addEventListener('change', handleFileSelect);

// Event listeners para drag and drop
uploadContainer.addEventListener('dragover', handleDragOver);
uploadContainer.addEventListener('dragleave', handleDragLeave);
uploadContainer.addEventListener('drop', handleDrop);

// Prevenir comportamento padrão do navegador
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadContainer.addEventListener(eventName, preventDefaults);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDragOver(e) {
    uploadContainer.classList.add('dragover');
}

function handleDragLeave(e) {
    uploadContainer.classList.remove('dragover');
}

function handleDrop(e) {
    uploadContainer.classList.remove('dragover');
    const files = e.dataTransfer.files;
    handleFiles(files);
}

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    // Converter FileList para Array
    const filesArray = Array.from(files);
    
    // Filtrar apenas imagens
    const imageFiles = filesArray.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
        alert('Por favor, selecione apenas arquivos de imagem!');
        return;
    }
    
    // Processar cada imagem
    imageFiles.forEach(file => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const photo = {
                id: Date.now() + Math.random(),
                src: e.target.result,
                name: file.name
            };
            
            uploadedPhotos.push(photo);
            displayPhoto(photo);
        };
        
        reader.readAsDataURL(file);
    });
}

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
    // Remover do array
    uploadedPhotos = uploadedPhotos.filter(photo => photo.id !== photoId);
    
    // Remover do DOM
    const photoItem = document.querySelector(`.photo-item[data-id="${photoId}"]`);
    if (photoItem) {
        photoItem.remove();
    }
}

// Busca de pets
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const query = document.getElementById('search-query').value;
    
    if (query.trim() === '') {
        alert('Por favor, digite algo para buscar!');
        return;
    }
    
    // Simulação de busca (você pode integrar com um backend)
    searchPets(query);
});

function searchPets(query) {
    // Limpar resultados anteriores
    resultsContainer.innerHTML = '<p>Buscando pets...</p>';
    
    // Simulação de delay de busca
    setTimeout(() => {
        // Dados de exemplo (substitua por dados reais do backend)
        const exampleResults = [
            {
                name: 'Rex',
                type: 'Cachorro',
                description: 'Labrador dourado, muito amigável',
                location: 'Videira, SC',
                image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=300'
            },
            {
                name: 'Mimi',
                type: 'Gato',
                description: 'Gato persa branco com olhos azuis',
                location: 'Centro, Videira',
                image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300'
            },
            {
                name: 'Bob',
                type: 'Cachorro',
                description: 'Vira-lata caramelo, usa coleira vermelha',
                location: 'Bairro São Cristóvão',
                image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300'
            }
        ];
        
        displayResults(exampleResults);
    }, 1000);
}

function displayResults(results) {
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhum pet encontrado. Tente outra busca.</p>';
        return;
    }
    
    resultsContainer.innerHTML = results.map(pet => `
        <div class="pet-card">
            <img src="${pet.image}" alt="${pet.name}">
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p><strong>Tipo:</strong> ${pet.type}</p>
                <p><strong>Descrição:</strong> ${pet.description}</p>
                <p><strong>Local:</strong> ${pet.location}</p>
                <button class="contact-button">Entrar em Contato</button>
            </div>
        </div>
    `).join('');
}

// Inicialização
console.log('Sistema de upload de fotos carregado!');