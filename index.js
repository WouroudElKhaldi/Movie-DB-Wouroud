const express = require('express') ;
const port = 3000 ;
const app = express() ;

// simple server 
app.get('/', (request , response) => {
    response.send('OK')
}) ;

app.listen(port, () => console.log(`Server is now listening on port ${port}
check the local host: http://localhost:${port}`))

// test route
app.get('/test' , (request, response) => {
    response.json({status: 200 , message : "OK"})
}) ;

// time routr
app.get('/time', (request, response) => {
    const date = new Date() ;
    const time = `${date.getHours()}:${date.getMinutes()}`
    response.json({status : 200, message: time})
}) ;

// hello route 
app.get('/hello/:ID', (request, response) => {
    const {ID} = request.params ;
    response.json({status: 200 , message: `Hello ${ID}!` })
}) ;

// search route 
app.get(`/search` , (request , response) => {
    const {s} = request.query ;
    if (s) {
        response.json({status: 200 , message: "ok" , data: s }) ;
    } else {
        response.status(500).json({status: 500 , error: true, message: `you have to provide a search`})
    }
}) ;

// movie create route 
app.get('/movies/create', (request, response) => {
    response.json({ status: 200, message: 'create route'});
});

// movie read route 
app.get('/movies/read', (request, response) => {
    // response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.json({ status: 200, message: 'read route', data: movies});
});

// sort by date
app.get('/movies/read/by-date', (request, response) => {
    const moviesByDate = [...movies].sort((old, neww) => neww.year - old.year);
    response.json({ status: 200, data: moviesByDate });
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
        response.json({status: 200 , data : movie });
    } else {
        response.status(404).json({status: 404 , error: true , message: `The movie ${ID} does not exist`})
    }
})

// movie update route 
app.get('/movies/update', (request, response) => {
    response.json({ status: 200, message: 'update route'});
});

// movie delete route 
app.get('/movies/delete', (request, response) => {
    response.json({ status: 200, message: 'delete route'});
});

// array of movies
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8},
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: `اﻹرهاب و الكباب‎`, year: 1992, rating: 6.2 }
]