let page = 1
let infiniteScroll
let maxPage

searchFormBtn.addEventListener('click', () => {
    if (searchFormInput.value.trim()){
        location.hash = '#search=' + searchFormInput.value
        searchFormInput.value = ''
    }
})

arrowBtn.addEventListener('click', () => {
    console.log('click arrow')
    history.back()
})

trendingBtn.addEventListener('click', (evt) => {
    location.hash = '#trends'
})

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
window.addEventListener('scroll', infiniteScroll, false)

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function navigator() {
    console.log('- navigator -')

    if (infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, { passive: false })
        infiniteScroll = undefined
    }

    if (location.hash.startsWith('#trends')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage()
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage()
    } else {
        homePage()
    }

    scrollToTop()

    if (infiniteScroll){
        window.addEventListener('scroll', infiniteScroll, { passive: false })
    }
}

const homePage = () => {
    console.log('- home -')
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')
    trendingPreviewSection.classList.remove('inactive')
    likedMoviesSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    getTrendingMoviesPreview()
    getCategoriesPreview()
    getLikedMovies()
}

const categoriesPage = () => {
    console.log('- categories -')
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, categoryData] = location.hash.split('=')
    const [id, categoryName] = categoryData.split('-')

    getMoviesByCategory(id, categoryName).then()

    infiniteScroll = getPaginatedMoviesByCategory(id)
}

const searchPage = () => {
    console.log('- search -')
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, query] = location.hash.split('=')
    getMoviesBySearch(query)

    infiniteScroll = getPaginatedMoviesBySearch(query)
}

const movieDetailsPage = () => {
    console.log('- movie -')
    headerSection.classList.add('header-container--long')
    // headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    const [_, movieId] = location.hash.split('=')
    getMovieById(movieId)
    getSimilarMovies(movieId)
    relatedMoviesContainer.scrollLeft = -1
}

const trendsPage = () => {
    console.log('- trends -')
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')
    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    getTrendingMovies().then()
    infiniteScroll = getPaginatedTrendingMovies
}
