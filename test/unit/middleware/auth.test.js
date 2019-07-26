const {User} = require('../../../model/user_model');
const mongoose = require('mongoose');
const auth = require('../../../middleware/auth');
let server;

describe('auth middleware unit test', ()=>{
    beforeEach(()=>{
        server = require('../../../index');
    })
    afterEach(()=>{
        server.close();
    })

    it ('should have the user field populated', ()=>{
        const user = {
            _id : mongoose.Types.ObjectId().toHexString(),
            isAdmin : true
        }
        const token = new User(user).generateAuthToken();
        const req = {
            header : jest.fn().mockReturnValue(token)
        }
        const res = {};
        
        const next = jest.fn();

        auth(req,res,next);

        expect(req.user).toMatchObject(user);
    })
})

