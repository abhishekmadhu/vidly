const mongoose = require('mongoose');
const Joi = require('joi');

// Validates the structure of the POST requests 
rentalValidator = (requestBody) => {
    
    // Create a schema for the movie object
    let schema = Joi.object({    
        customerId: Joi.string().required(),
        movieId: Joi.string().required(),
    });

    // Return a response based on the movie's validity
    return schema.validate(requestBody);
};

const rentalCustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    isGold: { type: String, required: true }
});

const rentalMovieSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength:255 },
    dailyRentalRate: { type: Number, required: true }
})

const rentalSchema = new mongoose.Schema({
    customer: { type: rentalCustomerSchema, required: true },
    movie: { type: rentalMovieSchema, required: true },
    dateOut: { type: Date, required: true, default: Date.now },
    dateReturned: { type: Date, required: false },
    rentalFee: { type: Number, required: false, min:0, max:1000 },
})

const Rental = mongoose.model('Rental', rentalSchema);

exports.Rental = Rental;
exports.validator = rentalValidator;