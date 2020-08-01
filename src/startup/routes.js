const express = require('express');
const error = require('../middlewares/error');
// Import the genres router
const genres = require('../routes/genres');

// Import the homepage router
const home = require('../routes/homePage');

// Import the customers router
const customers = require('../routes/customers');

// Import the movies router
const movies = require('../routes/movies');

// Import the rentals router
const rentals = require('../routes/rentals');

// Import the users router
const users = require('../routes/users');

// Import the auth router
const auth = require('../routes/auth');

module.exports = function (app) {
    // Use the JSON middleware from express
    app.use(express.json());

    // Use the router for home / 
    app.use('/', home);

    // Use the router for /api/genres
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    // Register the error middleware after all other middlewares
    app.use(error);
}