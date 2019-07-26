const {Genre} = require('../model/genre_model');


async function getAllGenres(){
    return await Genre.find();
}

async function saveGenre(name){
    const genre = new Genre({
        name : name
    })
    return await genre.save();
}

async function getGenreById(id){
    return await Genre.findById(id);
}

async function updateGenre(id, name){
    return await Genre.findByIdAndUpdate({_id:id},{
        $set:{
            name : name
        }
    }, {new: true});
}

async function removeGenre(id){
    return await Genre.findByIdAndDelete({_id:id});
}

module.exports.getAllGenres = getAllGenres;
module.exports.saveGenre = saveGenre;
module.exports.getGenreById = getGenreById;
module.exports.updateGenre = updateGenre;
module.exports.removeGenre = removeGenre;

