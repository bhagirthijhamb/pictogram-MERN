const express = require('express');
const router = express.Router();

const { getUsers, createUser, loginUser } = require('./userController');

router.route('/')
    .get(getUsers) // GET /api/users/
    .post(createUser) // POST /api/users/

router.route('/login').post(loginUser) // POST /api/users/login/

module.exports = router;