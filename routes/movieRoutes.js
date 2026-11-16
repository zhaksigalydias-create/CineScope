const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

// Search movies using GET
router.get('/search', movieController.searchMovies);

// Search movies using POST
router.post('/search', movieController.searchMovies);

// Show movie details
router.get('/movie/:id', movieController.showMovie);

module.exports = router;