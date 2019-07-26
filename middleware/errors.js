const winston = require('winston');

module.exports = function(err,req,res,next){
    winston.error(err.message, {chris : "handsome boy"});
    winston.log('info', err.message, {lily : 'pretty girl'});
    res.status(400).send(err.message);
}