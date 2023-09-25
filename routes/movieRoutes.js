const express = require('express');
const router = express.Router();
const Movie = require('../models/MovieModel');
const userAuthent = require('../middleware/userAuthent');


// movie create route 
router.post('/movies/add', userAuthent , async (request, response) => {
    try { 
        const {title , year , rating} = request.query ;
        const ratingValue = rating ? parseFloat(rating) : 4 ;

        if (title && year && year.length === 4 && !isNaN(year)) {
            const newMovie = new Movie({
                title , 
                year: parseInt(year) ,
                rating: ratingValue
            }) ;

            const savedMovie = await newMovie.save() ;

            response.json({
                status: 200 , 
                message: 'Your movie is added successfuly',
                data: savedMovie
            });
        } else {
        response.status(403).json({
            status: 403 , 
            error : true , 
            message: `You can't create a movie without providing a title and a year` 
        });            
        }
    } catch (error) {
        response.status(500).json({
            status: 500 ,
            error: true ,
            message : 'Internel Server Error'
        });
    }
});


// movie read route 
router.get('/movies/read', async (request, response) => {
    try {
        const movies = await Movie.find();
        response.json({ 
            status: 200, 
            message: 'read route', 
            data: movies,
        });        
    } catch (error) {
        response.status(500).json({
            status: 500 ,
            error: true ,
            message : 'Internel Server Error'
        });
    }
});


// sort by date
router.get('/movies/read/by-date', async (request, response) => {
    try {
        const moviesByDate = await Movie.find().sort({year: -1});
        response.json({ 
            status: 200, 
            data: moviesByDate 
        });
    } catch (error) {
        response.status(500).json({
            status: 500 ,
            error: true ,
            message : 'Internel Server Error'
        });
    }
});


// sort by rating
router.get('/movies/read/by-rating', async (request, response) => {
    try {
        const moviesByRate = await Movie.find().sort({rating: -1});
        response.json({
            status: 200,
            data: moviesByRate 
        });
    } catch (error) {
        response.status(500).json({
            status: 500 ,
            error: true ,
            message : 'Internel Server Error'
        });
    }

});


// sort by title
router.get('/movies/read/by-title', async (request, response) => {
    try {
    const moviesByDate = await Movie.find().sort({title: 1});
    response.json({
        status: 200,
        data: moviesByDate
        });
    } catch (error) {
        response.status(500).json({
            status: 500 ,
            error: true ,
            message : 'Internel Server Error'
        });
    }
});


// read one
router.get('/movies/read/id/:ID', async (request, response) => {
    try {
        const {ID} = request.params ;
        const movie = await Movie.findById(ID);

        if (!movie) {
            response.status(404).json({
                status: 404 , 
                error: true , 
                message: `The movie with the id ${ID} does not exist`
            });

        } else {
            response.json({
                status: 200 , 
                data : movie });
        }
    } catch (error) {
        response.status(500).json({
            status: 500 ,
            error: true ,
            message : `Internal Server Error`
        });
    }
});


// movie update route 
router.put('/movies/update/:ID', userAuthent , async (request, response) => {
        const {ID} = request.params ;
        const {title, year ,rating } = request.query ;    
        const movieToUpdate = await Movie.findById(ID);
    try {
        if(!movieToUpdate){
            response.status(404).json({ 
                status: 404 , 
                error : true ,
                message: `The movie with id= ${ID} does not exist` 
            });
        } else {
            if (title !== undefined) {
                movieToUpdate.title = title ;                
            } 
            if (year !== undefined){
                movieToUpdate.year = parseInt(year)
            }
            if (rating !== undefined){
                movieToUpdate.rating = parseFloat(rating) ;
            }

        const updatedMovie = await movieToUpdate.save() ;

        response.json({
            status: 200,
            message: `The movie with ID = ${ID} is updated`,
            data: updatedMovie
        }) ;
        }
    } catch (error) {
        response.status(500).json({
            status: 500 ,
            error: true ,
            message : `Internel Server Error`
        });
    }
});


// movie delete route 
router.delete('/movies/delete/:ID', userAuthent , async (request, response) => {
    try {
        const {ID} = request.params ;
        const movieTodelete = await Movie.findByIdAndRemove(ID);

        if (!movieTodelete) {
            response.status(404).json({ 
                status:404,
                error : true,
                message:`The movie with the id ${ID} does not exist`
            });
        } else {
            response.json({ 
                status: 200 ,
                message : `The movie with the id ${ID} is deleted.`,
                data: await Movie.find()
            });
        }
    } catch (error) {
        response.status(500).json({
            status: 500,
            error: true,
            message: 'Internal Server Error'
        });
    }
});

module.exports = router ;