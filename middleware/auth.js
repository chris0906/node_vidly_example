const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next){
    // if token is not provided return 401(unauthorized)
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('lack valid authentication');
    // if token is valid, user field should be populated correctly
    try {
        const encoded = jwt.verify(token, config.get('privateKey'));
        req.user = encoded;
        next();
    } catch (error) {//otherwise return 400 to represent invalid authentication
        res.status(400).send('invalid authentication');
    }
}