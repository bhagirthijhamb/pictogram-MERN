const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./utils/db');



// Define middleware
// const customMiddleware = (req, res, next) => {
//     console.log('middleware executed !');
//     next();
// }
// use middleware for all the routes
// app.use(customMiddleware);

// const dbName = 'pictogram';
// const uri = `mongodb://localhost:27017/${dbName}`;

console.log('__dirname', __dirname);
console.log(process.env.MONGO_URI, process.env.NODE_ENV);
console.log(path.resolve(__dirname, './../.env'))

dotenv.config({ path: path.resolve(__dirname, './../.env')});
console.log(process.env.MONGO_URI);
connectDB();
app.use(cookieParser());
// Express body parser middleware
app.use(express.json({ extended: false }));


const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');
const { connect } = require('./posts/postRoutes');
// User Routes
app.use('/api/users', userRoutes)
// Post Routes
app.use('/api/posts', postRoutes)




// server.js at the very end of the file.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./build'));
    // only add this part if you are using React Router
    app.get('*', (req,res) =>{
        console.log('__dirname', __dirname);
        console.log(path.join(__dirname+'/build/index.html'));
        res.sendFile(path.join(__dirname+'/build/index.html'));
    });
}

// connect to database
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(async () => {
//         console.log(`Successfuly connected to: ${MONGO_URI}`)
//         // Start Server
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     })
//     .catch(err => console.log(err.message));

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.listen(SERVER_PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${SERVER_PORT}`));


// Start Server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
