const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    // This should come from a config file
// URI/databaseName
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('Connected to MongoDB...'))
        .catch(err => {winston.error('Could not connect to MongoDB', err);});


}