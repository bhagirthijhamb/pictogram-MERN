const express = require('express');
const router = express.Router();
const { getPosts, createPost, getMyPosts }  = require('./postController');
const { verifyToken } =  require('./../utils/auth');


const Post = require('./postModel');

router.route('/').get(getPosts)
router.use(verifyToken).route('/').post(createPost);
router.use(verifyToken).route('/myPosts').get(getMyPosts);

module.exports = router;