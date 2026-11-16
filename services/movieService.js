
const axios = require('axios');

// Get API key from .env
const API_KEY = process.env.OMDB_API_KEY;

// Search movies by title, type and year
async function searchMovies(title, type, year) {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: API_KEY,
            s: title,
            type: type || undefined,
            y: year || undefined
        }
    });

    return response.data;
}

// Get information about one movie
async function getMovieDetails(id) {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: API_KEY,
            i: id,
            plot: 'full'
        }
    });

    return response.data;
}
async function getMoviesByGenre(movies, genre) {
    const detailedMovies = await Promise.all(
        movies.map(async (movie) => {
            return await getMovieDetails(movie.imdbID);
        })
    );

    return detailedMovies.filter((movie) => {
        return movie.Genre &&
            movie.Genre.toLowerCase().includes(genre.toLowerCase());
    });
}

module.exports = {
    searchMovies,
    getMovieDetails,
    getMoviesByGenre
};