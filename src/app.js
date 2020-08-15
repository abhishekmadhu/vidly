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

  // CORS enablement utility. This is kept here as this is important in terms of security development. 
  // This can be changed later to ensure that only proper origins get the responses. 
  // Others will either be blocked in node, or they will not get the response in the browser anyway. 

  let callerHost = req.get('origin');
  
  if (!callerHost) callerHost = req.get('host');
  
  // res.header("Access-Control-Allow-Origin", "localhost:4200"); // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Origin", "chrome-search://local-ntp"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", callerHost); // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Credentials", "true");
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
