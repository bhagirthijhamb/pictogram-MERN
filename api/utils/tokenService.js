const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../keys');

exports.createToken = (user) => {
    // jwt.sign() takes user object with id/_id as key and saved user _id as value & JWT_SECRET
    const token = jwt.sign(user, JWT_SECRET);
    return token;
}

exports.verifyToken = async(token) => {
    let user;
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err){
            throw err;
        } 
        // console.log('payload', payload);
        // we assigned { id: savedUser._id } object as user to jwt.sign()/ createToken in user controller
        // we are assigning it here from payload to user

        user = payload;
        // console.log(user);
    })
    return user;
}