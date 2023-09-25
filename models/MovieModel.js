const mongoose = require('mongoose');

// mongoose schema 
const Movie = new mongoose.Schema({
    title: {
        type :String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number ,
        default: 4
    }
})

module.exports = mongoose.model('Movie', Movie);