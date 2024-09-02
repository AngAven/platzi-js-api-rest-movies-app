const navigator = () => {
    if (location.hash.startsWith('#trends')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        moviesPage()
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage()
    } else {
        homePage()
    }

    location.hash
}

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

const homePage = () => {
    console.log('- home -')
    getTrendingMoviesPreview()
    getCategoriesPreview()
}

const categoriesPage = () => {
    console.log('- categories -')
}

const searchPage = () => {
    console.log('- search -')
}

const moviesPage = () => {
    console.log('- movie -')
}

const trendsPage = () => {
    console.log('- trends -')
}