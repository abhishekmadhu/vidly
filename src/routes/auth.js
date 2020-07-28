const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');

validateAuth = (requestBody) => {
    
    // Create a schema for the user object
    let schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(8).max(255).required()
    });

    // Return a response based on the user's validity
    return schema.validate(requestBody);
};

// ======== List all rentals ========
// router.get('/', async (req, res) => {
//     const users = await User.find();
//     return res.status(200).send(users);
// });

// ======== Create a new user ========
router.post('/', async (req, res) => {
    // Validate
    const { error } = validateAuth(req.body);
    
    // If validation fails, return the error
    if (error) { return res.status(400).send(error); }

    // Verify if user already registered
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res
            .status(400)
            .send('Invalid email or password');
    }
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res
            .status(400)
            .send('Invalid email or password');
    }

    // Return a copy of the created object to the client 
    // as per specification. 
    return res.status(200).send(true);

});

module.exports = router;