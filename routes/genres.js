const genreDb = require('../database/genre_db');
const express = require('express');
const admin = require('../middleware/admin');
const  auth = require('../middleware/auth');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res,next) => {
  const genres = await genreDb.getAllGenres();
  res.send(genres);
});

function asyncMiddleware(handler){
  return async (req, res, next)=>{
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  }
}

router.post('/', auth, async (req, res,next) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await genreDb.saveGenre(req.body.name);
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  //const genre = genres.find(c => c.id === parseInt(req.params.id));
  //if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  try{
    const genre = await genreDb.updateGenre(req.params.id, req.body.name)
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  }catch(ex){
    res.send(ex.message);
  };
  
});

router.delete('/:id', [auth,admin],async (req, res) => {
  //const genre = genres.find(c => c.id === parseInt(req.params.id));
  try {
    const genre = await genreDb.removeGenre(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');     
    res.send(genre);
  } catch (error) {
    res.send(error.message)
  }
  
    

  //const index = genres.indexOf(genre);
  //genres.splice(index, 1);

});

router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('The genre with the given ID was not found.');
  try {
    const genre = await genreDb.getGenreById(req.params.id);
    if(!genre) 
      return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);  
  } catch (error) {
    res.send(ex.message);
  }
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;