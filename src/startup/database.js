const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    // This should come from a config file
    // URI/databaseName
    const db = config.get('db');

    // Remove for security reasons, the password gets logged in the startup logs this way.
    // console.log("========================>" + db + "<========================");
    mongoose.connect(db)
        .then(() => winston.info(`Connected to MongoDB...`))
        .catch(err => {winston.error(`Could not connect to MongoDB`, err);});


}