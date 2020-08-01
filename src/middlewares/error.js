const winston = require('winston');

module.exports = function(err, req, res, next){
    // Log this issue for future
    // error
    // warn
    // info
    // verbose
    // debug
    // silly
    
    winston.info(err.message, err);

    res.status(500).send('Something failed!');
}