const express = require('express') ;
const port = 3001 ;

// connecting to databese
const mongoose = require('mongoose');
const URI = "mongodb+srv://wouroudelkhaldi:Warde.2004@cluster0.gckvicz.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
        app.listen(port, () => console.log(`Server is now listening on port ${port}
        check the local host: http://localhost:${port}
        Connected to Mongo DB`))
    })
    .catch((error) => {
        console.error(error);
    })
const app = express() ;
// middleware for authentication
const userAuthent = (request, response, next) => {
    const { username, password } = request.headers;
    const userAuth = users.find(
      (user) => user.username === username && user.password === password
    );

    if (userAuth) {
      next();
    } else {
      response.status(403).json({ 
            status: 403, 
            error: true, 
            message: 'Unauthorized , wrong username or password' });
    }
  }
app.use(express.json());

// mongoose schema 
const mongoSchema = new mongoose.Schema({
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

// mongoose model
const Movie = mongoose.model('Movie' , mongoSchema) ;

// simple server 
app.get('/', (request , response) => {
    response.send('OK')
}) ;

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
app.get('/hello/:ID?', (request, response) => {
    const {ID} = request.params ;
    if (ID){
    response.json({
        status: 200 , 
        message: `Hello ${ID}!` })        
    } else {
        response.json({
            status: 200 , 
            message: `Hello!` })          
    }
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
app.post('/movies/add', userAuthent , async (request, response) => {
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
            movies.push(savedMovie);

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
app.get('/movies/read', async (request, response) => {
    try {
        const movies = await Movie.find();
        response.json({ 
            status: 200, 
            message: 'read route', 
            data: movies
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
app.get('/movies/read/by-date', async (request, response) => {
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
app.get('/movies/read/by-rating', async (request, response) => {
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
app.get('/movies/read/by-title', async (request, response) => {
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
app.get('/movies/read/id/:ID', async (request, response) => {
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
app.put('/movies/update/:ID', userAuthent , async (request, response) => {
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
        const {ID} = request.params ;
        response.status(500).json({
            status: 500 ,
            error: true ,
            message : `Internel Server Error`
        });
    }
});

// movie delete route 
app.delete('/movies/delete/:ID', userAuthent , async (request, response) => {
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
            const deletedMovie = movies.splice(ID, 1);
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

// array of movies
const movies = []

// step 11 was done by default from step 5

// users part 
// movie read route 
app.get('/users/read', (request, response) => {
    response.json({ 
        status: 200, 
        message: 'read route', 
        data: users
    });
});

// user create route
app.post('/users/add' ,(request, response) => {
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
app.get('/users/read/by-name', (request, response) => {
    const usersByName = [...users].sort((first, last) => first.username.localeCompare(last.username));
    response.json({ 
        status: 200, 
        data: usersByName });
});


// sort by password
app.get('/users/read/by-password', (request, response) => {
    const usersByPassword = [...users].sort((first, last) => first.password.localeCompare(last.password));
    response.json({ 
        status: 200, 
        data: usersByPassword 
    });
});


// read one
app.get('/users/read/name/:name', (request, response) => {
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


app.put('/users/update/:name', (request, response) => {
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
app.delete('/users/delete/:name' , (request, response) => {
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


// array of users
const users = [
    { username: 'John', password: 'blabla1' },
    { username: 'Adam',  password: 'blabla2' },
    { username: 'Jane',  password: 'blabla3' },
    { username: `Wouroud`, password: 'blabla4'  }
]
