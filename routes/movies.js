const {Movie} = require('../model/movie_model');
const {Genre} = require('../model/genre_model');
const express = require('express');
const router = express.Router();


router.get('/',async (req,res)=>{
    //validation using Joi
    try {
        const result = await Movie.find();
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})


router.post('/',async (req,res)=>{
    try {
        const genre = await Genre.findById(req.body.genreId);
        const movie = new Movie({
            title : req.body.title,
            numberInStock : req.body.numberInStock,
            genre : {
                name : genre.name
            },
            dailyRentalRate : req.body.dailyRentalRate
        })
        const result = await movie.save();
        res.send(result);       
    } catch (error) {
        res.send(error.message);
    }
})



module.exports = router;