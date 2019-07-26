const {User} = require('../../../model/user_model');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('generateAuthToken', ()=>{
    it('retuen a qualified token', ()=>{
        const payload = {
            _id : new mongoose.Types.ObjectId().toHexString(), 
            isAdmin : true
        };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('privateKey'));
        expect(decoded).toMatchObject(payload);
    })
})