const movieSlides = document.querySelector('.movie-slides');
const template = document.querySelector('#movie-card-template');
const prev = document.querySelector('#previous');
const next = document.querySelector('#next');

// variable to keep track of movies to show
let leftIndex = 0;

async function setupCarousel() {
  const response = await fetch('http://localhost:3000/movies');
  const result = response.json();
  const movies = await result;
  console.log('movies length', movies.length);

  console.log('movies', movies);

  showCurrentMovies(movies, leftIndex);

  showButtons(movies);

  next.addEventListener('click', () => {
    console.log('next clicked');

    leftIndex++;
    showButtons(movies);
    movieSlides.innerHTML = '';
    showCurrentMovies(movies, leftIndex);
  });

  prev.addEventListener('click', () => {
    console.log('prev clicked');
    leftIndex--;
    movieSlides.innerHTML = '';
    showButtons(movies);
    showCurrentMovies(movies, leftIndex);
  });
}

function showCurrentMovies(movies, leftIndex) {
  for (let i = leftIndex; i < leftIndex + 4; i++) {
    getMovieCard(movies[i]);
  }
}

function showButtons(movies) {
  if (leftIndex === 0) {
    prev.classList.add('hidden');
  } else {
    prev.classList.remove('hidden');
  }

  if (leftIndex + 3 === movies.length - 1) {
    next.classList.add('hidden');
  } else {
    next.classList.remove('hidden');
  }
}

function renderCurrentMovies(movies) {
  for (let i = leftIndex; i < leftIndex + 4; i++) {
    getMovieCard(movies[i]);
  }
}

function getMovieCard(movie) {
  const templateClone = template.content.cloneNode(true);
  const movieCard = templateClone.querySelector('.movie-card');

  movieCard.dataset.movieId = movie.id;
  const imgDiv = templateClone.querySelector('.img-div');
  const img = templateClone.querySelector('.img');
  img.src = movie.imgUrl;
  const movieName = templateClone.querySelector('.movie-name');
  movieName.innerText = movie.name;
  const outlineInfo = templateClone.querySelector('.outline-info');
  outlineInfo.innerText = movie.outlineInfo;
  movieSlides.appendChild(templateClone);
}

setupCarousel();
