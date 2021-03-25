const { verifyToken } = require('./../utils/tokenService');
const User = require('./../users/userModel');
const { JWT_SECRET } = require('../keys');

// requireLogin Middleware 
// module.exports = (req, res, next) => {
//     const { authorization } = req.headers;
//     if(!authorization){
//         return res.status(401).json({ error: "You must be logged in" })
//     }
//     const token = authorization.replace("Bearer ", "");
//     JWT_SECRET.verify(token, JWT_SECRET, (err, payload) => {
//         if(err){
//             return res.status(401).json({ error: "Invalid or expired token" })
//             // we assigned { id: savedUser._id } object as user to jwt.sign()/ createToken in user controller
//             // we can destructure it here from payload
//         }
//         const { id } = payload;
//         User.findById(id).then(userdata => {
//             req.user = userdata;
//         })
//         next();
//     })
// }


exports.verifyToken = async(req, res, next) => {
    const { cookies } = req;
    try {
        if(!cookies || !cookies.token){
            res.status(403).json({ message: 'authorization required' });
            return;
        }
        const token = cookies.token;
        const user = await verifyToken(token);
        const userData = await User.findById(user.id);
        req.user = userData;
        // console.log('req.user', req.user);
        next();
    } catch(err) {
        res.status(403).json({ message: 'invalid or expired token' })
    }
}