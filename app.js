
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Import routes
const movieRoutes = require('./routes/movieRoutes');

// Import middleware
const requestLogger = require('./middleware/requestLogger');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Set the folder for EJS pages
app.set('views', path.join(__dirname, 'views'));

// Read form data
app.use(express.urlencoded({ extended: true }));

// Log requests
app.use(requestLogger);

// Serve CSS and images
app.use(express.static(path.join(__dirname, 'public')));

// Main page
app.get('/', (req, res) => {
    res.render('index');
});

// Movie routes
app.use('/', movieRoutes);

// Handle unknown pages
app.use(notFound);

// Handle server errors
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`CineScope is running at http://localhost:${PORT}`);
});

