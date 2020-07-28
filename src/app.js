// Module to learn and practice implementation of 
// a basic node application with express. 
// All hail Mosh Hamedani, the tutor for this course. 
// I am just a student learning "stuff".
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const { request } = require('express');

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: vidly_jwtPrivateKey is not set in the environment!');
    process.exit(-1);
}

// This should come from a config file
// URI/databaseName
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));


// Import the homepage router
const home = require('./routes/homePage');

// Import the genres router
const genres = require('./routes/genres');

// Import the customers router
const customers = require('./routes/customers');

// Import the movies router
const movies = require('./routes/movies');

// Import the rentals router
const rentals = require('./routes/rentals');

// Import the users router
const users = require('./routes/users');

// Import the auth router
const auth = require('./routes/auth');

// Create an express application 
const app = express();

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

// Get the post information from the environment variable 'PORT'. 
// If it does not exist, use 3000 as default. 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
