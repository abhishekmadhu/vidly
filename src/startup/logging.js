
const winston = require('winston');

module.exports = function () {
    // Handle all exceptions that are outside the scope of express
    process.on('uncaughtException', (ex) => {
        console.log('WE GOT AN UNCAUGHT ERROR');
        winston.error(ex.message, ex);
        process.exit(-1);
    })

    // Catch all unhandled Promise rejections
    process.on('unhandledRejection', (ex) => {
        console.log('WE GOT AN Unhandled Promise rejection');
        winston.error(ex.message, ex);
        process.exit(-2);
    })

    winston.add(winston.transports.File, { filename: 'logfile.log' });

    // Needs a plugin. keep lite when not required
    // winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });        
}