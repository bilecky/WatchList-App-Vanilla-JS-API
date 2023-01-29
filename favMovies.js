const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')
const moviesBox = document.querySelector('.movies')
const favMovies = document.querySelector('.movies-fav')
const watchList = document.querySelector('.watchlist')
const noMoviesParagraph = document.querySelector('.no-fav-movies')
const API_KEY = '7b891d'

const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&t=`

const storedMovies = localStorage.getItem('movies')
let parsedMovies = JSON.parse(storedMovies)
let favMoviesArr = []

favMoviesArr = parsedMovies

const checkArray = () => {
	if (favMoviesArr.length > 0) {
	  noMoviesParagraph.innerHTML = '';
	} else {
	  noMoviesParagraph.innerHTML = `<p>No favorite movies, add some</p>
	  <i class="fa-solid fa-video"></i>`;
	}
  };

const render = () => {
	if (favMoviesArr) {
		for (movie of favMoviesArr) {
			favMovies.innerHTML += ` <div id =${movie.id} class="movie__card">
		 <div class="movie__img">
		  <img src=${movie.poster} alt="">
		 </div>
		 <div class="movie__info">
		  <h3 class="movie__title">${movie.title}</h3>
		  <div class="movie__details">
		   <p class="time">${movie.time}</p>
		   <p class="type">${movie.type}</p><button class="remove-btn"><i class="fa-solid fa-circle-minus"></i>
			Delete movie</button>
		  </div>
		  <div class="movie__about">${movie.plot}</div>
		 </div>
		</div>`
		}
	}
	checkArray()
}

document.addEventListener('click', e => {
	const target = e.target.closest('.remove-btn')
	if (target) {
	  const movieId = target.closest('.movie__card').id
	  favMoviesArr = favMoviesArr.filter(movie => movie.id !== movieId)
	  localStorage.setItem('movies', JSON.stringify(favMoviesArr))
	  favMovies.innerHTML = ''
	  favMoviesArr.forEach(movie => {
		favMovies.innerHTML += ` <div id =${movie.id} class="movie__card">
		  <div class="movie__img">
			<img src=${movie.poster} alt="">
		  </div>
		  <div class="movie__info">
			<h3 class="movie__title">${movie.title}</h3>
			<div class="movie__details">
			  <p class="time">${movie.time}</p>
			  <p class="type">${movie.type}</p>
			  <button class="remove-btn">
				<i class="fa-solid fa-circle-minus"></i> Delete movie
			  </button>
			</div>
			<div class="movie__about">${movie.plot}</div>
		  </div>
		</div>`
	  })
	  checkArray()
	}
  })

render()
checkArray()