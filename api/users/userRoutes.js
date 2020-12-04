const express = require('express');
const router = express.Router();
const { verifyToken } =  require('./../utils/auth');

const { getUsers, createUser, loginUser, getUser, getMyDetails, getUserDetails } = require('./userController');

router.route('/')
    .get(getUsers) // GET /api/users/
    .post(createUser) // POST /api/users/

router.route('/login').post(loginUser) // POST /api/users/login/
router.use(verifyToken).route('/me').get(getMyDetails) // GET /api/users/me/
router.use(verifyToken).route('/user/:userId').get(getUserDetails) // GET /api/users/user/:userId
module.exports = router;