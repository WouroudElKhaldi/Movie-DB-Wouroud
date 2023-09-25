const express = require('express');
const router = express.Router();

// simple server 
router.get('/', (request , response) => {
    response.send('OK')
}) ;

// test route
router.get('/test' , (request, response) => {
    response.json({
        status: 200 , 
        message : "OK"
    });
}) ;

// time routr
router.get('/time', (request, response) => {
    const date = new Date() ;
    const time = `${date.getHours()}:${date.getMinutes()}`
    response.json({
        status : 200, 
        message: time
    });
}) ;

// hello route 
router.get('/hello/:ID?', (request, response) => {
    const {ID} = request.params ;
    if (ID){
    response.json({
        status: 200 , 
        message: `Hello ${ID}!` 
    });    
    } else {
        response.json({
            status: 200 , 
            message: `Hello!` 
        });         
    }
}) ;

// search route 
router.get(`/search` , (request , response) => {
    const {s} = request.query ;
    if (s) {
        response.json({
            status: 200 , 
            message: "ok" , 
            data: s 
        }) ;
    } else {
        response.status(500).json({
            status: 500 , 
            error: true, 
            message: `you have to provide a search`
        });
    }
}) ;

module.exports = router;