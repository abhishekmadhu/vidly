const mongoose = require('mongoose');
const Joi = require('joi');

// Validates the structure of the POST requests 
userValidator = (requestBody) => {
    
    // Create a schema for the user object
    let schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(255)
    });

    // Return a response based on the user's validity
    return schema.validate(requestBody);
};

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 255 },
    email: { type: String, required: true, maxlength: 255, unique: true },
    password: { type: String, required: true, minlength: 8, maxlength: 255 },
})

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validator = userValidator;