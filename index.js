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