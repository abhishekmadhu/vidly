// Module to learn and practice implementation of 
// a basic node application with express. 
// All hail Mosh Hamedani, the tutor for this course. 
// I am just a student learning "stuff".

const express = require('express');
const mongoose = require('mongoose');
const { request } = require('express');

// This should come from a config file
// URI/databaseName
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));


// Import the homepage router
const home = require('./routes/homePage');

// Import the genres router
const genres = require('./routes/genres');

// Create an express application 
const app = express();

// Use the JSON middleware from express
app.use(express.json());

// Use the router for home / 
app.use('/', home);

// Use the router for /api/genres
app.use('/api/genres', genres);

// Get the post information from the environment variable 'PORT'. 
// If it does not exist, use 3000 as default. 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
