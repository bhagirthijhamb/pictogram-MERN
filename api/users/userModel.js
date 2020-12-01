const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

// userSchema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // confirmPassword: { type: String, required: true }
    // imageUrl: 
})

userSchema.pre('save', async function(next) {
    // this is the document (user object) that we are trying to save
    const user = this; 

    if(user.isModified('password') || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 12);
            user.password = hash;
        } catch(err) {
            return next(err);
        }
    } else {
        return next(err);
    }
})

userSchema.methods.comparePasswords = function(password) {
    // return bcrypt.compare(password, this.password)
    const user = this;
    return bcrypt.compare(password, user.password);
}

module.exports = mongoose.model('User', userSchema);