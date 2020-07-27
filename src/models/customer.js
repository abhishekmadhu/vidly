const mongoose = require('mongoose');
const Joi = require('joi');

// Validates the structure of the POST requests 
customerValidator = (requestBody) => {
    
    // Create a schema for the customer object
    let schema = Joi.object({
        name: Joi.string().max(255).required(),
        phone: Joi.string().required().min(5).max(11),
        isGold: Joi.boolean().required()
    });

    // Return a response based on the customer's validity
    return schema.validate(requestBody);
};

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    isGold: { type: String, required: true }
})

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
exports.validate = customerValidator;
