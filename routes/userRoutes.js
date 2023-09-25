const express = require('express');
const router = express.Router();
const users = require('../data/usersData');


// users read route 
router.get('/users/read', (request, response) => {
    response.json({ 
        status: 200, 
        message: 'read route', 
        data: users
    });
});


// user create route
router.post('/users/add' ,(request, response) => {
    const {username , password} = request.query ;
    if ( !username || !password) {
        response.status(403).json({
            status: 403 , 
            error : true , 
            message: `You can't add a user without providing a username and a password` 
})
    } else {
        const newUser = {
            username ,
            password
        } ;
        users.push(newUser) ;
        response.json({
            status: 200 , 
            message : `user ${username} added successfuly` ,
            data: users});
    }
});


// sort by username
router.get('/users/read/by-name', (request, response) => {
    const usersByName = [...users].sort((first, last) => first.username.localeCompare(last.username));
    response.json({ 
        status: 200, 
        data: usersByName });
});


// sort by password
router.get('/users/read/by-password', (request, response) => {
    const usersByPassword = [...users].sort((first, last) => first.password.localeCompare(last.password));
    response.json({ 
        status: 200, 
        data: usersByPassword 
    });
});


// read one
router.get('/users/read/name/:name', (request, response) => {
    const {name} = request.params ;
    const user = users.find( (user) => user.username === name );
    if (!user) {
        response.status(404).json({
            status: 404 , 
            error: true , 
            message: `The user with username : ${name} does not exist`
})
    } else {
        response.json({
            status: 200 , 
            data : user });
    }
})


// user update route
router.put('/users/update/:name', (request, response) => {
    const {name} = request.params ;
    const {username , password} = request.query ;
    const userIndex = users.findIndex((user) => user.username === name);
    if(userIndex === -1 ){
        response.status(404).json({ 
            status: 404 , 
            error : true ,
            message: `The user with username = ${name} does not exist` 
        });
    } else {
            if (username !== undefined) {
                users[userIndex].username = username ;                
            } 
            if (password !== undefined){
                users[userIndex].password = password
            }
        response.json({
            status: 200,
            message: `The user with username = ${name} is updated`,
            data: users
        })  
    }
});


// user delete route 
router.delete('/users/delete/:name' , (request, response) => {
    const {name} = request.params ;
    const userIndex = users.findIndex((user) => user.username === name);
    if (userIndex === -1) {
        response.status(404).json({ 
            status:404,
            error : true,
            message:`The user with the username ${name} does not exist`
})
    } else {
        const deletedUser = users.splice(userIndex, 1);
        response.json({ 
            status: 200 ,
            message : `The user with the username ${name} is deleted.`,
            data: users
})
    }
});

module.exports = router;