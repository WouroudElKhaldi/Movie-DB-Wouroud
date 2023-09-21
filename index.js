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
})

// time routr
app.get('/time', (request, response) => {
    const date = new Date() ;
    const time = `${date.getHours()}:${date.getMinutes()}`
    response.json({status : 200, message: time})
})