const { verifyToken } = require('./../utils/tokenService');

exports.verifyToken = async(req, res, next) => {
    const { cookies } = req;
    console.log(req.cookies);
    try {
        // console.log('inside virify');
        if(!cookies || !cookies.token){
            res.status(403).json({ message: 'authorization required' });
            return;
        }
        const token = cookies.token;
        // { id: someuserid }
        const userToken = await verifyToken(token);
        req.user = userToken;
        next();
    } catch(err) {
        res.status(403).json({ message: 'invalid or expired token' })
    }
}