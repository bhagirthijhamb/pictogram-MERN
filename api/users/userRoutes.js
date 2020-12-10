const express = require('express');
const router = express.Router();
const { verifyToken } =  require('./../utils/auth');

const { getUsers, createUser, loginUser, getUser, getMyDetails, getMyProfile, getUserDetails, followUser, unfollowUser, editUserProfile, logoutUser } = require('./userController');

router.route('/')
    .get(getUsers) // GET /api/users/
    .post(createUser) // POST /api/users/

router.route('/login').post(loginUser) // POST /api/users/login/
router.use(verifyToken).route('/me').get(getMyDetails) // GET /api/users/me/
router.use(verifyToken).route('/user').get(getMyProfile) // GET /api/users/me/
router.use(verifyToken).route('/user/:userId').get(getUserDetails) // GET /api/users/user/:userId
router.use(verifyToken).route('/user/follow').put(followUser);
router.use(verifyToken).route('/user/unfollow').put(unfollowUser);
router.use(verifyToken).route('/user/editProfile').put(editUserProfile);
router.use(verifyToken).route('/logout').get(logoutUser);
module.exports = router;