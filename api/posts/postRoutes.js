const express = require('express');
const router = express.Router();
const { getPosts, createPost }  = require('./postController');
const { verifyToken } =  require('./../utils/auth');


const Post = require('./postModel');

router.route('/').get(getPosts)
router.use(verifyToken).route('/').post(createPost);

module.exports = router;