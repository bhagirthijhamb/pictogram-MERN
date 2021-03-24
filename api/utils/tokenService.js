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
        user = payload;
        // console.log(user);
    })
    return user;
}