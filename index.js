const express = require('express') ;
const port = 3001 ;
const app = express() ;

// simple server 
app.get('/', (request , response) => {
    response.send('OK')
}) ;

app.listen(port, () => console.log(`Server is now listening on port ${port}
check the local host: http://localhost:${port}`))

// test route
app.get('/test' , (request, response) => {
    response.json({
        status: 200 , 
        message : "OK"})
}) ;

// time routr
app.get('/time', (request, response) => {
    const date = new Date() ;
    const time = `${date.getHours()}:${date.getMinutes()}`
    response.json({
        status : 200, 
        message: time})
}) ;

// hello route 
app.get('/hello/:ID', (request, response) => {
    const {ID} = request.params ;
    response.json({
        status: 200 , 
        message: `Hello ${ID}!` })
}) ;

// search route 
app.get(`/search` , (request , response) => {
    const {s} = request.query ;
    if (s) {
        response.json({
            status: 200 , 
            message: "ok" , 
            data: s }) ;
    } else {
        response.status(500).json({
            status: 500 , 
            error: true, 
            message: `you have to provide a search`})
    }
}) ;

// movie create route 
app.post('/movies/add', (request, response) => {
    const {title , year , rating} = request.query ;
    const ratingValue = rating ? parseFloat(rating) : 4 ;
    if (title && year && year.length === 4 && !isNaN(year)) {
        const newMovie = {
            title , 
            year: parseInt(year) ,
            rating: ratingValue
        } ;
        movies.push(newMovie) ;
        response.json({
            message: 200 , 
            data: movies});
    } else {
        response.status(403).json({
            status: 403 , 
            error : true , 
            message: `You can't create a movie without providing a title and a year` })
    }
});

// movie read route 
app.get('/movies/read', (request, response) => {
    // response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.json({ 
        status: 200, 
        message: 'read route', 
        data: movies});
});

// sort by date
app.get('/movies/read/by-date', (request, response) => {
    const moviesByDate = [...movies].sort((old, neww) => neww.year - old.year);
    response.json({ 
        status: 200, 
        data: moviesByDate });
});

// sort by rating
app.get('/movies/read/by-rating', (request, response) => {
    const moviesByDate = [...movies].sort((low, high) => high.rating - low.rating);
    response.json({ status: 200, data: moviesByDate });
});

// sort by title
app.get('/movies/read/by-title', (request, response) => {
    const moviesByDate = [...movies].sort((first, last) => first.title.localeCompare(last.title));
    response.json({ status: 200, data: moviesByDate });
});

// read one
app.get('/movies/read/id/:ID', (request, response) => {
    const {ID} = request.params ;
    const movieIndex = parseInt(ID) - 1;
    if (movieIndex >= 0 && movieIndex < movies.length) {
        const movie = movies.find( (movie ,index) => index === movieIndex );
        response.json({
            status: 200 , 
            data : movie });
    } else {
        response.status(404).json({
            status: 404 , 
            error: true , 
            message: `The movie ${ID} does not exist`})
    }
})

// movie update route 
app.put('/movies/update/:ID', (request, response) => {
    const {ID} = request.params ;
    const movieIndex = parseInt(ID) - 1 ;
    const {title, year ,rating } = request.query ;
    if(movieIndex >= 0 && movieIndex < movies.length){
            if (title !== undefined) {
                movies[movieIndex].title = title ;                
            } 
            if (year !== undefined){
                movies[movieIndex].year = parseInt(year)
            }
            if (rating !== undefined){
                movies[movieIndex].rating = parseFloat(rating) ;
            }
        response.json({
            status: 200,
            message: `The movie with ID= ${ID} is updated`,
            data: movies
        })  
    } else {
        response.status(404).json({ 
            status: 404 , 
            error : true ,
            message: `The movie with id= ${ID} does not exist` 
        });
    }
});

// movie delete route 
app.delete('/movies/delete/:ID', (request, response) => {
    const {ID} = request.params ;
    const movieIndex = parseInt(ID) - 1;
    if (movieIndex >=0 && movieIndex < movies.length) {
        const delet = movies.splice(movieIndex, 1);
        response.json({ status: 200 ,
                        message : `The movie with the id ${ID} is deleted.`,
                        data: movies})
    } else {
        response.status(404).json({ status:404,
                                    error : true,
                                    message:`The movie with the id ${ID} does not exist`})
    }
});

// array of movies
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8},
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: `اﻹرهاب و الكباب`, year: 1992, rating: 6.2 }
]