const BASE_URL = 'https://api.themoviedb.org/3/'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: BEREAR
    }
}

const createMovieContainer = (url, title, parentClass) => {
    const parent = document.querySelector(parentClass)
    const container = document.createElement('div')
    const img = document.createElement('img')

    container.classList.add('movie-container')
    img.classList.add('movie-img')
    img.src = url
    img.alt = title
    container.appendChild(img)
    parent.appendChild(container)

    return container
}

const getTrendingMoviesPreview = async () => {
    const response = await fetch(`${BASE_URL}trending/movie/day?language=en-US`, options)
    const {results} = await response.json()
    results.forEach((movie) => {
        console.log(movie)
        createMovieContainer(
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path,
            movie.title,
            '.trendingPreview-movieList')
    })
}

getTrendingMoviesPreview()