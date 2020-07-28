const express = require('express');
const router = express.Router();
const {User, validator} = require('../models/user');
const _ = require('lodash');

// ======== List all rentals ========
router.get('/', async (req, res) => {
    const users = await User.find();
    return res.status(200).send(users);
});

// ======== Create a new user ========
router.post('/', async (req, res) => {
    // Validate
    const { error } = validator(req.body);
    
    // If validation fails, return the error
    if (error) { return res.status(400).send(error); }

    // Verify if user already registered
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res
            .status(400)
            .send('This email is already associated with another user');
    }
    
    // Create a new rental object
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    // Add the rental object to the list of rentals. 
    // In real world we will save this to a DB. 
    // rentals.push(rental);
    user = await user.save();

    // Return a copy of the created object to the client 
    // as per specification. 
    return res.status(200).send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;