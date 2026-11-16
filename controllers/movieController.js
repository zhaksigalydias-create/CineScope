
const movieService = require('../services/movieService');

async function searchMovies(req, res) {
    try {
        const searchData = req.method === 'POST' ? req.body : req.query;

        const title = searchData.title;
        const type = searchData.type;
        const year = searchData.year;
        const genre = searchData.genre;

        if (!title || title.trim() === '') {
            return res.render('index', {
                error: 'Please enter a search word',
                movies: []
            });
        }

        // Check if the year is valid
        if (year && !/^\d{4}$/.test(year)) {
            return res.render('index', {
                error: 'Please enter a valid 4-digit year',
                movies: []
            });
        }

        // Check if the selected content type is valid
        const allowedTypes = ['', 'movie', 'series', 'episode'];

        if (!allowedTypes.includes(type || '')) {
            return res.render('index', {
                error: 'Invalid content type selected',
                movies: []
            });
        }

        // Check if the selected genre is valid
        const allowedGenres = [
            '',
            'Action',
            'Adventure',
            'Animation',
            'Comedy',
            'Crime',
            'Drama',
            'Fantasy',
            'Horror',
            'Romance',
            'Sci-Fi',
            'Thriller'
        ];

        if (!allowedGenres.includes(genre || '')) {
            return res.render('index', {
                error: 'Invalid genre selected',
                movies: []
            });
        }

        // Search using all selected filters
        let data = await movieService.searchMovies(
            title.trim(),
            type,
            year
        );

        if (genre && data.Response === 'True') {
            data.Search = await movieService.getMoviesByGenre(
                data.Search,
                genre
            );
        }

        // Check if no movies match the selected filters
        if (data.Response === 'True' && data.Search.length === 0) {
            return res.render('results', {
                movies: [],
                error: 'No movies found with the selected filters.'
            });
        }

        if (data.Response === 'False') {
            return res.render('index', {
                error: data.Error,
                movies: []
            });
        }

        res.render('results', {
            movies: data.Search,
            error: null
        });

    } catch (error) {
        console.error(error.message);

        res.render('index', {
            error: 'Something went wrong. Please try again.',
            movies: []
        });
    }
}

// Show details of one movie
async function showMovie(req, res) {
    try {
        const id = req.params.id;

        const movie = await movieService.getMovieDetails(id);

        if (movie.Response === 'False') {
            return res.status(404).send('Movie not found');
        }

        res.render('details', { movie });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Unable to load movie details');
    }
}

module.exports = {
    searchMovies,
    showMovie
};
