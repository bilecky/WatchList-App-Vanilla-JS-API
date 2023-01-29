const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')
const moviesBox = document.querySelector('.movies')
const favMovies = document.querySelector('.movies-fav')
const watchList = document.querySelector('.watchlist')

const API_KEY = '7b891d'

const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&t=`
const storedMovies = localStorage.getItem('movies')
const parsedMovies = JSON.parse(storedMovies)
let favMoviesArr = []
if (parsedMovies) {
	favMoviesArr = parsedMovies
}
function addMovie() {
	localStorage.setItem('movies', JSON.stringify(favMoviesArr))
}

async function fetchMovies(e) {
	let inputVal = searchInput.value

	const response = await fetch(API_URL + inputVal)
	const movie = await response.json()
	if (movie.Response === 'True') {
		console.log(movie.Response)
		const movieExists = favMoviesArr.find(favMovie => favMovie.id === movie.imdbID)
		if (!movieExists) {
			favMoviesArr.unshift({
				title: movie.Title,
				poster: movie.Poster,
				time: movie.Runtime,
				type: movie.Genre,
				plot: movie.Plot,
				id: movie.imdbID,
			})
		}

		moviesBox.innerHTML = `
		<div class="movie__card">
		  <div class="movie__img">
			<img src=${movie.Poster} alt="">
		  </div>
		  <div class="movie__info">
			<h3 class="movie__title">${movie.Title}</h3>
			<div class="movie__details">
			  <p class="time">${movie.Runtime}</p>
			  <p class="type">${movie.Genre}</p>
			  <button class="add-btn">
				<i class="fa-solid fa-circle-plus"></i>
				Add to watchlist
			  </button>
			</div>
			<div class="movie__about">${movie.Plot}</div>
		  </div>
		</div>`
	}
	searchInput.value = ''
}

searchBtn.addEventListener('click', fetchMovies)
document.addEventListener('click', e => {
	const target = e.target.closest('.add-btn')
	if (target) {
		target.addEventListener('click', addMovie)
	}
})
searchInput.addEventListener('keydown', e => {
	if (e.keyCode === 13) {
		fetchMovies()
	}
})
