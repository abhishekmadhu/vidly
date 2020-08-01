const authMiddleware = require('../middlewares/auth');
const { Genre, validator } = require('../models/genre');
const express = require('express');
const admin = require('../middlewares/admin');
const router = express.Router();


// ======== List all genres ========
router.get('/', async (req, res, next) => {
    try {
        const genres = await Genre.find().sort('name');
        return res.status(200).send(genres);
    }

    catch (ex) {
        // Log this issue for future 
        next(exception); 
        // passing the control to the next middleware function, 
        // which is the error handler.
    }
});

// ======== Create a new genre ========
router.post('/', authMiddleware, async (req, res) => {
    // Validate
    const { error } = validator(req.body);
    
    // If validation fails, return the error
    if (error) return res.status(400).send(error);

    // Create a new genre object
    let genre = new Genre({
        name: req.body.name,
        details: req.body.details
    });

    // Add the genre object to the list of genres. 
    // In real world we will save this to a DB. 
    // genres.push(genre);
    genre = await genre.save();

    // Return a copy of the created object to the client 
    // as per specification. 
    return res.status(200).send(genre);

});

// ======== Change the values of a genre ========
router.put('/:id', async (req, res) => {

    // Validate the insertable data
    const { error } = validator(req.body);

    // If validation fails, return the error
    if (error) return res.status(400).send(error);

    // Create a new object to hold the new details. 
    // All options should ideally be optional
    let genreNewDetails = {
        name: req.body.name
    }
    if (req.body.details) { genreNewDetails.details = req.body.details; };
    
    // Get genres from the database
    const genre = await Genre.findByIdAndUpdate(req.params.id, genreNewDetails, { new: true });

    // If object with said id does not exist, return an error
    if (!genre) return res.status(404).send(`Object with id ${req.params.id} not found!`);

    return res.status(200).send(genre);

});

// ======== Delete a genre by ID ========
router.delete('/:id', [authMiddleware, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    // If object with said id does not exist, return an error
    if (!genre) return res.status(404).send(`Genre with id ${req.params.id} not found!`);

    return res.status(200).send(genre);
});

// ======== Get a genre by ID ========
router.get('/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id)

    // // Check that one object with the said id exists
    // let genre = genres.find(c => c.id === parseInt(req.params.id));

    // If object with said id does not exist, return an error
    if (!genre) return res.status(404).send(`Genre with id ${req.params.id} not found!`);
    
    return res.send(genre);
  });

  module.exports = router;
