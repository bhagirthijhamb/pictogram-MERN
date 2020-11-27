const express = require('express');
const mongoose = require('mongoose');
// require routers

const app = express();

const PORT = 5000;
const dbName = 'pictogram';
const uri = `mongodb://localhost:27017/${dbName}`;


// Express body parser middleware
app.use(express.json({ extended: false }));
// Define middleware
const customMiddleware = (req, res, next) => {
    console.log('middleware executed !');
    next();
}
// use middleware for all the routes
// app.use(customMiddleware);

// Models
require('./models/User');
require('./models/Post')
// mongoose.model('User')

const users = require('./routes/userRoutes');
const posts = require('./routes/postRoutes');
// User Routes
app.get('/api/users', users.getUsers);
app.post('/api/users/signup', users.signup);
// Post Routes
app.get('/api/posts', posts.getPosts);
app.post('/api/posts/post', posts.createPost);

// connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Successfuly connected to: ${uri}`))
    .catch(err => console.log(err.message));



// TO DO
// define routes
app.get('/', (req, res) => {

    res.send('Hello World !')
})

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
