const winston = require('winston');
const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')){
        winston.error('FATAL ERROR: vidly_jwtPrivateKey is not set in the environment!');
        process.exit(-1);
    }
    
}