const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

// Validates the structure of the POST requests 
movieValidator = (requestBody) => {
    
    // Create a schema for the movie object
    let schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(1000),
        dailyRentalRate: Joi.number().required()
    });

    // Return a response based on the movie's validity
    return schema.validate(requestBody);
};

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength:255 },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, min:0, max:1000 },
    dailyRentalRate: { type: Number, required: true }
})

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
exports.validator = movieValidator;