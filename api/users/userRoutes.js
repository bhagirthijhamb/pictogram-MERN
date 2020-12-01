const express = require('express');
const router = express.Router();
const { verifyToken } =  require('./../utils/auth');

const { getUsers, createUser, loginUser, getUser, getMyDetails } = require('./userController');

router.route('/')
    .get(getUsers) // GET /api/users/
    .post(createUser) // POST /api/users/

router.route('/login').post(loginUser) // POST /api/users/login/
// router.use(verifyToken).route('/me').get(getMyDetails) // POST /api/users/login/
router.route('/me').get(getMyDetails) // POST /api/users/login/

module.exports = router;