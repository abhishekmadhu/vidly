const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();
const {User, validator} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

// ======== List all users ========
router.get('/', async (req, res) => {
    const users = await User.find().select('-password');
    return res.status(200).send(users);
});

// ======== Get current logged-in user details ========
router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).send(user);
})

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
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Add the rental object to the list of rentals. 
    // In real world we will save this to a DB. 
    // rentals.push(rental);
    await user.save();

    // TODO: Take this private key from config. Change it while setting it up. 
    const token = user.generateAuthToken()
    // Return a copy of the created object to the client 
    // as per specification. 
    return res
        .header('x-auth-token', token)
        .status(200)
        .send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;