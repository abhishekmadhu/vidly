const mongoose = require('mongoose');
const Joi = require('joi');


// Validates the structure of the POST requests 
genreValidator = (requestBody) => {
    
    // Create a schema for the genre object
    let schema = Joi.object({
        name: Joi.string().min(3).max(12).required(),
        details: Joi.string().optional()
    });

    // Return a response based on the genre's validity
    return schema.validate(requestBody);
};

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    details: { type: String, required: false }
})

const Genre = mongoose.model('Genre', genreSchema);

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validator = genreValidator;