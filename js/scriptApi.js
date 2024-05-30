const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Yjk1ZjMxOTQ4MjU2ZTlhYmI1MTM3MDNlNWQ4YjhlNSIsInN1YiI6IjY2NTczNzMxNjQ1M2ViYjliNTBjODkyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gND3-fxvE3-trhrjFdNniSlIpFENI27vUw7Qpf6Y_iY';
const API_URL = 'https://api.themoviedb.org/3';

let currentPage = 1;

function llamarApi(page) {
  fetch(`${API_URL}/movie/popular?page=${page}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then(response => response.json())

    .then(data => dibujarDatos(data));

}

function llamarApiAclamadas(page) {
  fetch(`${API_URL}/movie/top_rated?page=${page}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then(response => response.json())

    .then(data => dibujarDatosAclamadas(data));

}

function dibujarDatosAclamadas(json) {
  const filas = json.results.map(obj => PeliculaAclamada(obj));
  document.querySelector(' .aclamadas ').innerHTML = filas.join('');
}

function dibujarDatos(json) {
  const filas = json.results.map(obj => Pelicula(obj));
  document.querySelector('.peliculasTendencia .peliculas').innerHTML = filas.join('');
}


function Pelicula(obj) {
  return `
    <a href="#">
      <div class="pelicula">
        <img class="imgTendencia" src="https://image.tmdb.org/t/p/w500/${obj.poster_path}" alt="${obj.title}" loading="lazy">
        <div class="tituloPelicula">
          <h4>${obj.title}</h4>
        </div>
      </div>
    </a>
  `;
}

function PeliculaAclamada(obj) {
  return `
  <div class="peliculaItem">
  <img src="https://image.tmdb.org/t/p/w500/${obj.poster_path}" alt="${obj.title}" loading="lazy" class="imgAclamada">
  <div class="tituloPelicula">
          <h4>${obj.title}</h4>
        </div>
  </div>
  `;
}


function cargarPaginaSiguiente() {
  currentPage++;
  llamarApi(currentPage);
}

function cargarPaginaAnterior() {
  if (currentPage > 1) {
    currentPage--;
    llamarApi(currentPage);
  }
}

//agrego los event listeners a los botones

document.querySelector('.anterior').addEventListener('click', cargarPaginaAnterior);
document.querySelector('.siguiente').addEventListener('click', cargarPaginaSiguiente);

// // Llamar a la función para obtener y dibujar los datos iniciales
llamarApi(currentPage);
llamarApiAclamadas(currentPage)
