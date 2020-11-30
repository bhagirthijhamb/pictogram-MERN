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

const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');
// User Routes
app.use('/api/users', userRoutes)
// Post Routes
app.use('/api/posts', postRoutes)

// connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log(`Successfuly connected to: ${uri}`)
        // Start Server
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err.message));


// Start Server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
