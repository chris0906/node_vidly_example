const request = require('supertest');
const {Genre} = require('../../model/genre_model');
const mongoose = require('mongoose');
const {User} = require('../../model/user_model');
let server;

describe('/api/genres', () => {
    beforeEach(()=>{server = require('../../index');});
    afterEach(async ()=>{
        server.close();
        await Genre.remove({});
        
    });
    describe('get /', () => {
        it('get all genres', async () => {
            await Genre.collection.insertMany([
                {name : 'genreq'},
                {name : 'genrew'}
            ]);

            const res = await request(server).get('/api/genres'); 
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genreq')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genrew')).toBeTruthy();
        })
    })

    describe('get /:id', () => {
        it('get specific genre', async () => {
            const genre = new Genre({
                name : 'genre1'
            })
            await genre.save();
            //await Genre.collection.insertOne(genre); error
            const res = await request(server).get(`/api/genres/${genre._id}`);
            expect(res.status).toBe(200);
            //expect(res.body).toMatchObject({name : 'genre1'});
            expect(res.body).toHaveProperty('name', genre.name);
        })
        it('return 404 if invalid value is passed', async () => {
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        })
    })

    describe('POST /', () => {
        let token;
        let name;
        const execute = async ()=>{
            return await request(server)
                    .post('/api/genres')
                    .set('x-auth-token',token)
                    .send({name});            
        }
        beforeEach(()=>{
            token = new User().generateAuthToken();
            name = 'genre1';
        })
        it ('if user isn\'t logged in, 401 should be returned', async ()=>{
            token = '';
            const res = await execute();
            expect(res.status).toBe(401);
        })

        it ('if genre name is less than 5 length, 400 should be returned', async ()=>{
            name = '1234';

            const res = await execute();
            
            expect(res.status).toBe(400);
        })
        it ('if genre name is great than 50, 400 should be returned', async ()=>{
            name = new Array(52).join('a');
           
            const res = await execute();
            
            expect(res.status).toBe(400);
        })

        it ('if genre name is valid, shoud have genre in db', async ()=>{
            execute();

            const genre = await Genre.find({name : 'genre1'});
            expect(genre).not.toBeNull();
        })

        it ('if genre name is valid, shoud return genre in response', async ()=>{
            const res = await execute();
            
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name','genre1');
        })
    })
})
