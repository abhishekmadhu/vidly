const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    // This should come from a config file
    // URI/databaseName
    const db = config.get('db');
    console.log("========================>" + db + "<========================");
    mongoose.connect(db)
        .then(() => winston.info(`Connected to MongoDB ${db}...`))
        .catch(err => {winston.error(`Could not connect to MongoDB ${db}`, err);});


}