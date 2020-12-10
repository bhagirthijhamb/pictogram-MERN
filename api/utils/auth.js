const { verifyToken } = require('./../utils/tokenService');
const User = require('./../users/userModel');


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