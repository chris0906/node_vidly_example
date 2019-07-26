const winston = require('winston');
//require('winston-mongodb');
require('express-async-errors');


module.exports = function(){
    process.on('uncaughtException' ,ex=>{
        winston.log('info', ex.message);
        process.exit(1);
    })
    
    process.on('unhandledRejection', ex=>{
        winston.error(ex.message);
        process.exit(1);
    })
    
    
    winston.add(new winston.transports.Console({colorize:true, prettyPrint:true}));
    winston.add(new winston.transports.File({filename:'logfile.log'}));
    // winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/saleManagement'
    // , level : 'error'}));
    
    //const p = Promise.reject('promise reject');
    //p.then((x)=>console.log(x));
    
    //throw new Error('error outside pipeline');
    
}

