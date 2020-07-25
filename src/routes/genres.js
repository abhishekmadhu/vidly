const express = require('express');
const router = express.Router();

// Since we are not learning databases till next section, 
// use an in-memory array to store this.
// TODO: Check this implementation with Mosh's implementation later on.
let genres = [
    {id: 1, name: 'Hip', details: 'This is a hip genre!'},
    {id: 2, name: 'Jazz', details: 'This is a jazz genre!'},
    {id: 3, name: 'Country', details: 'This is a country genre!'}
];

// ======== List all genres ========
router.get('/', (req, res) => {return res.status(200).send(genres)});

// ======== Create a new genre ========
router.post('/', (req, res) => {
    // Validate
    const { error } = genreValidator(req.body);
    
    // If validation fails, return the error
    if (error) return res.status(400).send(error);

    // Create a new genre object
    const genre = {
        id: genres.length + 1,
        name: req.body.name,
        details: req.body.details
    };

    // Add the genre object to the list of genres. 
    // In real world we will save this to a DB. 
    genres.push(genre);

    // Return a copy of the created object to the client 
    // as per specification. 
    return res.status(200).send(genre);

});

// ======== Change the values of a genre ========
router.put('/:id', (req, res) => {
    // Check that one object with the said id exists
    let genre = genres.find(c => c.id === parseInt(req.params.id));

    // If object with said id does not exist, return an error
    if (!genre) return res.status(404).send(`Object with id ${req.params.id} not found!`);

    // Validate the insertable data
    const { error } = genreValidator(req.body);

    // If validation fails, return the error
    if (error) return res.status(400).send(error);

    // Set the genre object
    genre.name = req.body.name;
    if (req.body.details) genre.details = req.body.details;

    // Return a copy of the created object to the client 
    // as per specification. 
    return res.status(200).send(genre);

});

// ======== Delete a genre by ID ========
router.delete('/:id', (req, res) => {
    // Check that one object with the said id exists
    let genre = genres.find(c => c.id === parseInt(req.params.id));

    // If object with said id does not exist, return an error
    if (!genre) return res.status(404).send(`Genre with id ${req.params.id} not found!`);

    // Remove the item from the array
    genres = genres.filter((c) => c.id != genre.id);

    // Alternate way (better) to do this is:
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);

    return res.status(200).send(genre);

});

// ======== Get a genre by ID ========
router.get('/:id', (req, res) => {
    // Check that one object with the said id exists
    let genre = genres.find(c => c.id === parseInt(req.params.id));

    // If object with said id does not exist, return an error
    if (!genre) return res.status(404).send(`Genre with id ${req.params.id} not found!`);
    
    return res.send(genre);
  });

  module.exports = router;
