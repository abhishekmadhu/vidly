const { Movie, validator } = require('../models/movie');
const express = require('express');
const router = express.Router();
const {Genre} = require('../models/genre')


// ======== List all movies ========
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    return res.status(200).send(movies);
});

// ======== Create a new movie ========
router.post('/', async (req, res) => {
    // Validate
    const { error } = validator(req.body);
    
    // If validation fails, return the error
    if (error) { return res.status(400).send(error); }

    const genre = await Genre.findById(req.body.genreId);
    
    if (!genre) { return res.status(400).send('Invalid Genre ID!'); }

    // Create a new movie object
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    // Add the movie object to the list of movies. 
    // In real world we will save this to a DB. 
    // movies.push(movie);
    movie = await movie.save();

    // Return a copy of the created object to the client 
    // as per specification. 
    return res.status(200).send(movie);

});

// // ======== Change the values of a movie ========
// router.put('/:id', async (req, res) => {

//     // Validate the insertable data
//     const { error } = validator(req.body);

//     // If validation fails, return the error
//     if (error) return res.status(400).send(error);

//     // Create a new object to hold the new details. 
//     // All options should ideally be optional
//     let genreNewDetails = {
//         name: req.body.name
//     }
//     if (req.body.details) { genreNewDetails.details = req.body.details; };
    
//     // Get movies from the database
//     const movie = await Movie.findByIdAndUpdate(req.params.id, genreNewDetails, { new: true });

//     // If object with said id does not exist, return an error
//     if (!movie) return res.status(404).send(`Object with id ${req.params.id} not found!`);

//     return res.status(200).send(movie);

// });

// // ======== Delete a movie by ID ========
// router.delete('/:id', async (req, res) => {
//     const movie = await Movie.findByIdAndRemove(req.params.id);

//     // If object with said id does not exist, return an error
//     if (!movie) return res.status(404).send(`Genre with id ${req.params.id} not found!`);

//     return res.status(200).send(movie);
// });

// // ======== Get a movie by ID ========
// router.get('/:id', async (req, res) => {

//     const movie = await Movie.findById(req.params.id)

//     // // Check that one object with the said id exists
//     // let movie = movies.find(c => c.id === parseInt(req.params.id));

//     // If object with said id does not exist, return an error
//     if (!movie) return res.status(404).send(`Genre with id ${req.params.id} not found!`);
    
//     return res.send(movie);
// });

module.exports = router;
