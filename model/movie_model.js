const mongoose = require('mongoose');
const {genreSchema, Genre} = require('../model/genre_model');

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxlength : 32,
        minlength : 1
    },
    numberInStock : {
        type : Number,
        required : true,
        max : 100,
        min : 0
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        max : 10,
        min : 0
    },
    // genre : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'Genre'
    // }
    genre : {
        type : genreSchema,
        required : true
    }
})

const Movie = mongoose.model('Movie', movieSchema);

// saveMovie('5bd546547c9917029c55772f', 'Glasses Feeling', 17, 7);
// saveMovie('5bd5465a7c9917029c557730', 'Raining Dazing', 22, 2);
// saveMovie('5bd5465a7c9917029c557730', 'Musical Dim Day', 47, 3);
// saveMovie('5bd5463b7c9917029c55772e', 'Coffie Inspiration', 67, 8);
//printMovies();

// async function saveMovie(genreId, title, numberInStock, dailyRentalRate){
//     const movie = new Movie({
//         title,
//         numberInStock,
//         dailyRentalRate,
//         genre: genreId
//     });
//     const result = await movie.save();
//     console.log(result);
// }
// saveMovie(new Genre({name : 'Comedy'}), 'How I met your mother', 99, 9);
// saveMovie(new Genre({name : 'Action'}), 'Bruce Li', 23, 5);
// saveMovie(new Genre({name : 'Romance'}), 'Tetanic', 54, 3);

async function saveMovie(genre, title, numberInStock, dailyRentalRate){
    const movie = new Movie({
        title,
        genre,
        numberInStock,
        dailyRentalRate  
    });
    const result = await movie.save();
    console.log(result);
}

async function printMovies(){
    const movies = await Movie.find()
        .populate('genre-_id')
        .select('title genre');

    console.log(movies);    
}

exports.Movie = Movie;