// Module to learn and practice implementation of 
// a basic node application with express. 
// All hail Mosh Hamedani, the tutor for this course. 
// I am just a student learning "stuff".
const winston = require('winston');
const express = require('express');
const cors = require('cors');

// Create an express application 
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/configuration')();
require('./startup/prod')(app);
app.use(cors());

// Get the post information from the environment variable 'PORT'. 
// If it does not exist, use 3000 as default. 
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`CORS-enabled server listening on port ${port}...`));

module.exports = server;
