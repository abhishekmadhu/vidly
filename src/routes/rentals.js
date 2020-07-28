const { Rental, validator } = require('../models/rental');
const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie')
const {Customer} = require('../models/customer')


// ======== List all rentals ========
router.get('/', async (req, res) => {
    const rentals = await Rental.find();
    return res.status(200).send(rentals);
});

// ======== Create a new rental ========
router.post('/', async (req, res) => {
    // Validate
    const { error } = validator(req.body);
    
    // If validation fails, return the error
    if (error) { return res.status(400).send(error); }
    
    const customer = await Customer.findById(req.body.customerId);
    const movie = await Movie.findById(req.body.movieId);
    
    if (!customer) { return res.status(400).send('Invalid customerId!'); }
    if (!movie) { return res.status(400).send('Invalid movieId!'); }

    // Create a new rental object
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    });

    // Add the rental object to the list of rentals. 
    // In real world we will save this to a DB. 
    // rentals.push(rental);
    rental = await rental.save();

    // Return a copy of the created object to the client 
    // as per specification. 
    return res.status(200).send(rental);

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
    
//     // Get rentals from the database
//     const movie = await Rental.findByIdAndUpdate(req.params.id, genreNewDetails, { new: true });

//     // If object with said id does not exist, return an error
//     if (!movie) return res.status(404).send(`Object with id ${req.params.id} not found!`);

//     return res.status(200).send(movie);

// });

// // ======== Delete a movie by ID ========
// router.delete('/:id', async (req, res) => {
//     const movie = await Rental.findByIdAndRemove(req.params.id);

//     // If object with said id does not exist, return an error
//     if (!movie) return res.status(404).send(`Genre with id ${req.params.id} not found!`);

//     return res.status(200).send(movie);
// });

// // ======== Get a movie by ID ========
// router.get('/:id', async (req, res) => {

//     const movie = await Rental.findById(req.params.id)

//     // // Check that one object with the said id exists
//     // let movie = rentals.find(c => c.id === parseInt(req.params.id));

//     // If object with said id does not exist, return an error
//     if (!movie) return res.status(404).send(`Genre with id ${req.params.id} not found!`);
    
//     return res.send(movie);
// });

module.exports = router;
