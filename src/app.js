// Module to learn and practice implementation of 
// a basic node application with express. 
// All hail Mosh Hamedani, the tutor for this course. 
// I am just a student learning "stuff".
const winston = require('winston');
const express = require('express');

// Create an express application 
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/configuration')();

// Get the post information from the environment variable 'PORT'. 
// If it does not exist, use 3000 as default. 
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
