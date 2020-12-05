const jwt = require('jsonwebtoken');
const KEY = 'I have 11 toes';

exports.createToken = (user) => {
    const token = jwt.sign(user, KEY);
    return token;
}

exports.verifyToken = async(token) => {
    let user;
    jwt.verify(token, KEY, (err, payload) => {
        if(err){
            throw err;
        } 
        // console.log('payload', payload);
        user = payload;
        // console.log(user);
    })
    return user;
}