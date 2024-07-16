const resposta = document.getElementById("resposta");
const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");
let pagina = 1;
let totalPaginas = 0;

function verificarPagina() {
  if (pagina === 1) {
    anterior.disabled = true;
    anterior.hidden = true;
  } else {
    anterior.disabled = false;
    anterior.hidden = false;
  }

  if (pagina === totalPaginas) {
    proximo.disabled = true;
    proximo.hidden = true;
  } else {
    proximo.disabled = false;
    proximo.hidden = false;
  }
}

function proximaPagina() {
  if (pagina < totalPaginas) {
    pagina++;
    verificarPagina();
    carregarPersonagens(pagina);
  }
}

function paginaAnterior() {
  if (pagina > 1) {
    pagina--;
    verificarPagina();
    carregarPersonagens(pagina);
  }
}

document.getElementById('buscar-personagem').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    buscarPersonagens();
  }
});

document.getElementById('buscar-botao').addEventListener('click', function () {
  buscarPersonagens();
});

async function buscarPersonagens() {
  const query = document.getElementById('buscar-personagem').value;
  const url = `https://rickandmortyapi.com/api/character/?name=${query}`;

  try {
    const response = await axios.get(url);
    const personagens = response.data.results;
    mostrarPersonagens(personagens);
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    document.getElementById('resposta').innerHTML = '<p>Personagem não encontrado.</p>';
  }
}

function mostrarPersonagens(personagens) {
  const resposta = document.getElementById('resposta');
  resposta.innerHTML = '';

  if (!personagens || personagens.length === 0) {
    resposta.innerHTML = '<p>Nenhum personagem encontrado.</p>';
    return;
  }

  personagens.forEach(personagem => {
    const personagemElement = document.createElement('div');
    personagemElement.className = 'card-content';
    personagemElement.innerHTML = `
          <img src="${personagem.image}" class="img-fluid rounded-start" alt="${personagem.name}">
          <div class="card-body">
              <h5 class="card-title">${personagem.name}</h5>
              <p class="card-text">Status: ${personagem.status}</p>
              <p class="card-text">Espécie: ${personagem.species}</p>
              <p class="card-text">Gênero: ${personagem.gender}</p>
              <p class="card-text"> Última Localização: ${personagem.location.name}</p> 
          </div>
      `;
    resposta.appendChild(personagemElement);
  });
}

async function carregarPersonagens(pagina) {
  const url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;

  try {
    const response = await axios.get(url);
    const personagens = response.data.results;
    totalPaginas = response.data.info.pages;
    mostrarPersonagens(personagens);
    verificarPagina(); // Verificar a página após carregar os personagens
  } catch (error) {
    console.error('Erro ao carregar personagens:', error);
  }
}

// Carregar a primeira página de personagens quando a página é carregada
document.addEventListener('DOMContentLoaded', function () {
  carregarPersonagens(pagina);
  verificarPagina(); // Verificar a página inicial para definir a visibilidade dos botões
});
