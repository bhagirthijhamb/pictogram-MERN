const mongoose = require('mongoose');
const { Schema } = mongoose;

// userSchema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
    // imageUrl: 
})

// create a collection called 'Users' whose documents will look like userSchema
// const User = mongoose.model('User', userSchema);

// Export mongoose model
// module.exports = User;

mongoose.model('User', userSchema);