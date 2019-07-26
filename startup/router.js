const movies = require('../routes/movies');
const customers = require('../routes/customers')
const genres = require('../routes/genres');
const users = require('../routes/users');
const auth = require('../routes/auth');
const errors = require('../middleware/errors');
const express = require('express');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(errors);
}
