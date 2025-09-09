// Variáveis globais
let timeAtivo = null;
let temaEscuro = false;

// Dados dos times
const dadosTimes = {
  'Flamengo': {
    historia: 'O Clube de Regatas do Flamengo foi fundado em 1895 no Rio de Janeiro. É o clube com maior torcida do Brasil e um dos maiores do mundo. Conquistou diversos títulos nacionais e internacionais, incluindo duas Libertadores e um Mundial de Clubes.',
    cor: '#a40000'
  },
  'Corinthians': {
    historia: 'O Sport Club Corinthians Paulista foi fundado em 1910 em São Paulo. Conhecido como "Timão", é um dos clubes mais populares do Brasil. Conquistou uma Libertadores, um Mundial de Clubes e diversos títulos brasileiros.',
    cor: '#000'
  },
  'Palmeiras': {
    historia: 'A Sociedade Esportiva Palmeiras foi fundada em 1914 em São Paulo. É o clube brasileiro com mais títulos oficiais e possui uma das maiores torcidas do país. Conquistou três Libertadores e diversos campeonatos nacionais.',
    cor: '#006437'
  }
};

// Função para inicializar os event listeners
function inicializar() {
  const cards = document.querySelectorAll('.card');
  const btnTema = document.getElementById('btnTema');
  const btnRemover = document.getElementById('btnRemover');
  const btnDuplicar = document.getElementById('btnDuplicar');
  
  // Event listeners para os cards
  cards.forEach(card => {
    card.addEventListener('click', () => selecionarTime(card));
  });
  
  // Event listeners para os botões
  btnTema.addEventListener('click', alternarTema);
  btnRemover.addEventListener('click', removerTime);
  btnDuplicar.addEventListener('click', duplicarTime);
}

// Função para selecionar um time
function selecionarTime(card) {
  const nomeTime = card.querySelector('h3').textContent;
  const corTime = card.dataset.color;
  
  // Remove borda ativa de todos os cards
  document.querySelectorAll('.card').forEach(c => {
    c.style.border = 'none';
    c.style.boxShadow = 'none';
  });
  
  // Adiciona borda ao card selecionado
  card.style.border = '3px solid ' + corTime;
  card.style.boxShadow = '0 0 15px ' + corTime;
  
  // Define o time ativo
  timeAtivo = card;
  
  // Muda cor de fundo do body
  document.body.style.backgroundColor = corTime;
  document.body.style.color = corTime === '#000' ? '#fff' : '#000';
  
  // Destaca o h1
  const titulo = document.getElementById('titulo');
  titulo.style.color = corTime;
  titulo.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
  
  // Exibe informações do time
  const info = document.getElementById('info');
  if (dadosTimes[nomeTime]) {
    info.innerHTML = `<strong>⚽ ${nomeTime}</strong><br>${dadosTimes[nomeTime].historia}`;
  }
  
  // Atualiza ranking
  atualizarRanking(nomeTime);
}

// Função para atualizar o ranking
function atualizarRanking(nomeTime) {
  const itemRanking = document.querySelector(`[data-time="${nomeTime}"]`);
  if (itemRanking) {
    const spanPontos = itemRanking.querySelector('[data-pontos]');
    const pontosAtuais = parseInt(spanPontos.dataset.pontos);
    const novosPontos = pontosAtuais + 1;
    
    spanPontos.dataset.pontos = novosPontos;
    spanPontos.textContent = novosPontos;
    
    // Reordena o ranking
    reordenarRanking();
  }
}

// Função para reordenar o ranking por pontos
function reordenarRanking() {
  const listaRanking = document.getElementById('listaRanking');
  const itens = Array.from(listaRanking.children);
  
  itens.sort((a, b) => {
    const pontosA = parseInt(a.querySelector('[data-pontos]').dataset.pontos);
    const pontosB = parseInt(b.querySelector('[data-pontos]').dataset.pontos);
    return pontosB - pontosA;
  });
  
  // Remove todos os itens e adiciona na nova ordem
  listaRanking.innerHTML = '';
  itens.forEach(item => listaRanking.appendChild(item));
}

// Função para alternar tema
function alternarTema() {
  const body = document.body;
  const btnTema = document.getElementById('btnTema');
  
  temaEscuro = !temaEscuro;
  
  if (temaEscuro) {
    body.style.backgroundColor = '#1a1a1a';
    body.style.color = '#ffffff';
    btnTema.textContent = '☀️ Alternar Tema';
  } else {
    body.style.backgroundColor = '#ffffff';
    body.style.color = '#000000';
    btnTema.textContent = '🌙 Alternar Tema';
    
    // Se há time ativo, restaura sua cor
    if (timeAtivo) {
      const corTime = timeAtivo.dataset.color;
      body.style.backgroundColor = corTime;
      body.style.color = corTime === '#000' ? '#fff' : '#000';
    }
  }
}

// Função para remover time ativo
function removerTime() {
  if (!timeAtivo) {
    alert('Selecione um time primeiro!');
    return;
  }
  
  const nomeTime = timeAtivo.querySelector('h3').textContent;
  
  // Remove do ranking
  const itemRanking = document.querySelector(`[data-time="${nomeTime}"]`);
  if (itemRanking) {
    itemRanking.remove();
  }
  
  // Remove o card
  timeAtivo.remove();
  
  // Reseta variáveis
  timeAtivo = null;
  document.body.style.backgroundColor = temaEscuro ? '#1a1a1a' : '#ffffff';
  document.body.style.color = temaEscuro ? '#ffffff' : '#000000';
  document.getElementById('titulo').style.color = '';
  document.getElementById('titulo').style.textShadow = '';
  document.getElementById('info').innerHTML = '<strong>⚽ Clique em um time para ver sua história...</strong>';
}

// Função para duplicar time ativo
function duplicarTime() {
  if (!timeAtivo) {
    alert('Selecione um time primeiro!');
    return;
  }
  
  const nomeTime = timeAtivo.querySelector('h3').textContent;
  const cardClonado = timeAtivo.cloneNode(true);
  
  // Modifica o nome para indicar que é uma cópia
  const nomeClonado = nomeTime + ' (Cópia)';
  cardClonado.querySelector('h3').textContent = nomeClonado;
  
  // Adiciona event listener ao card clonado
  cardClonado.addEventListener('click', () => selecionarTime(cardClonado));
  
  // Adiciona ao container
  const container = document.getElementById('cardContainer');
  container.appendChild(cardClonado);
  
  // Adiciona ao ranking
  const listaRanking = document.getElementById('listaRanking');
  const novoItemRanking = document.createElement('li');
  novoItemRanking.dataset.time = nomeClonado;
  novoItemRanking.innerHTML = `${nomeClonado}: <span data-pontos="0">0</span> pontos`;
  listaRanking.appendChild(novoItemRanking);
  
  // Adiciona aos dados dos times
  dadosTimes[nomeClonado] = {
    historia: dadosTimes[nomeTime].historia + ' (Esta é uma cópia do time original)',
    cor: dadosTimes[nomeTime].cor
  };
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializar);