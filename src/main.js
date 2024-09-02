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

        container.appendChild(title)
        parent.appendChild(container)
    }

    return container
}

const getTrendingMoviesPreview = async () => {
    const {data} = await api('trending/movie/day?language=en-US')
    const {results} = data

    results.forEach((movie) => {
        createContainer(
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path,
            movie.title,
            '.trendingPreview-movieList',
            'movie-container'
        )
    })
}

const getCategoriesPreview = async () => {
    const {data} = await api('genre/movie/list?language=en')
    const {genres} = data

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

getTrendingMoviesPreview()
getCategoriesPreview()