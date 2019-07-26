
const {User} = require('../model/user_model');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config');
const express = require('express');
const router = express.Router();




router.post('/', async (req, res)=>{
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email : req.body.email});
    if (!user) return res.status(400).send('user or password invalid');
    
    const valid = await bcrypt.compare(req.body.password, user.password);   
    if (!valid) return res.status(400).send('user or password invalid');
    
    const token = user.generateAuthToken();
    res.send(token);
})

function validateUser(user){
    const schema = {
        email : Joi.string().email({minDomainAtoms: 2}).required(),
        password : Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
}


module.exports = router; 