const BASE_URL = 'https://api.themoviedb.org/3/'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: BEREAR
    }
}

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        accept: 'application/json',
        Authorization: BEREAR
    }
})

const createContainer = (
    url = '',
    titleName = '',
    parentClass = '',
    containerClass = '',
    id = ''
) => {
    const parent = document.querySelector(parentClass)
    const container = document.createElement('div')

    if(containerClass === 'movie-container'){
        const img = document.createElement('img')

        container.classList.add(containerClass)
        img.classList.add('movie-img')
        img.src = url
        img.alt = titleName
        container.appendChild(img)
        parent.appendChild(container)
    } else if (containerClass === 'category-container'){
        const title = document.createElement('h3')

        container.classList.add('category-container')
        title.id = 'id' + id
        title.classList.add('category-title')
        title.textContent = titleName

        title.addEventListener('click', (ev) => {
            location.hash = `#category=${id}-${titleName}`
        })

        container.appendChild(title)
        parent.appendChild(container)
    } else if (containerClass === 'movie-container'){
        const img = document.createElement('img')

        container.classList.add('movie-container')
        img.src = url
        img.alt = titleName
        img.classList.add('movie-img')
        container.appendChild(img)
        parent.appendChild(container)
    }

    container.addEventListener('click', () => {
        console.log('id => ', id)
        location.hash = `#movie=${id}`
    })

    return container
}

const getTrendingMoviesPreview = async () => {
    const {data} = await api('trending/movie/day?language=en-US')
    const {results} = data

    // clear content
    trendingMoviesPreviewList.innerHTML = ''

    results.forEach((movie) => {
        createContainer(
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path,
            movie.title,
            '.trendingPreview-movieList',
            'movie-container',
            movie.id
        )
    })
}

const getCategoriesPreview = async () => {
    const {data} = await api('genre/movie/list?language=en')
    const {genres} = data

    //clear content
    categoriesPreviewList.innerHTML = ''

    genres.forEach(categorie => {
        createContainer(
            '',
            categorie.name,
            '.categoriesPreview-list',
            'category-container',
            categorie.id
        )
    })
}

const getMoviesByCategory = async (id, categoryName) =>  {
    headerCategoryTitle.textContent = decodeURI(categoryName)

    const {data} = await api('discover/movie', {
        params: {
            with_genres: id,
            language: 'en-US',
            page: 1,
            adult: true
        }
    })
    const {results} = data

    // clear content
    genericSection.innerHTML = ''

    results.forEach(movie => {
        createContainer(
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path,
            movie.title,
            '.genericList-container',
            'movie-container'
        )
    })
}

const getMoviesBySearch = async (query) => {
    headerCategoryTitle.textContent = decodeURI(query)

    const {data} = await api('search/movie', {
        params: {
            query: query,
        }
    })

    const {results} = data

    // clear content
    genericSection.innerHTML = ''

    results.forEach(movie => {
        createContainer(
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path,
            movie.title,
            '.genericList-container',
            'movie-container'
        )
    })
}

const getTrendingMovies = async () => {
    const {data} = await api('trending/movie/day?language=en-US')
    const {results} = data

    // clear content
    genericSection.innerHTML = ''
    results.forEach(movie => {
        createContainer(
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path,
            movie.title,
            '.genericList-container',
            'movie-container',
            movie.id
        )
    })

}

const getMovieById = async (movieId) => {
    const {data: movie} = await api('movie/' + movieId)
    const {genres} = movie
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path

    headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `

    movieDetailTitle.textContent = movie.title
    movieDetailScore.textContent = movie.vote_average
    movieDetailDescription.textContent = movie.overview

    //clear content
    movieDetailCategoriesList.innerHTML = ''

    genres.forEach(category => {
        createContainer(
            '',
            category.name,
            '.categories-list',
            'category-container',
            category.id
        )
    })
}

const getSimilarMovies = async(movieId) => {
    const {data} = await api(`movie/${movieId}/similar?language=en-US&page=1`)
    const {results} = data

    console.log('movieId => ', movieId)

    relatedMoviesContainer.innerHTML = ''
    console.log('data similar movies => ', results)
    results.forEach(movie => {
        createContainer(
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path,
            movie.title,
            '.relatedMovies-scrollContainer',
            'movie-container',
            movie.id
        )
    })
}