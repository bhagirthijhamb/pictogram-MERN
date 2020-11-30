const jwt = require('jsonwebtoken');
const KEY = 'I have 11 toes';

exports.createToken = (user) => {
    const token = jwt.sign(user, KEY);
    return token;
}