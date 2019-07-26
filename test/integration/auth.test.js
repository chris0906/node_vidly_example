let server;
const request = require('supertest');
const {Genre} = require('../../model/genre_model');
const {User} = require('../../model/user_model');


describe('auth middleware', ()=>{
    
    beforeEach(() => {
        server = require('../../index');
        token = new User().generateAuthToken();
    })
    afterEach(async () => {
        await Genre.remove({});
        server.close();
    })
    let token;
    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({name : 'genre1'})
    }
    it('should return 401 if token is not provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    })



})