const express = require('express') ;
const dotenv = require('dotenv') ;
const mongoose = require('mongoose');
const generalRoutes = require('./routes/generalRoutes');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express() ;
const port = process.env.PORT;
const uri = process.env.URI ;

mongoose.connect(uri , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
        app.listen(port, () => console.log(`
        Server is now listening on port ${port}
        check the local host: http://localhost:${port}
        Connected to Mongo DB`
        ));
    })
    .catch((error) => {
        console.error(error);
    })

app.use(express.json());
app.use('/' , generalRoutes);
app.use('/', movieRoutes);
app.use('/', userRoutes);

// Error handling middleware
app.use((err, request, response, next) => {
    console.error(err.stack);
    response.status(500).json({ error: 'Internal Server Error' });
  });

// step 11 was done by default from step 5