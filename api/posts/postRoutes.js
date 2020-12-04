const express = require('express');
const router = express.Router();
const { getPosts, createPost, getMyPosts, likePost, unlikePost, commentPost, deletePost }  = require('./postController');
const { verifyToken } =  require('./../utils/auth');


const Post = require('./postModel');

router.route('/').get(getPosts)
router.use(verifyToken).route('/').post(createPost);
// router.route('/').post(createPost);
router.use(verifyToken).route('/myPosts').get(getMyPosts);
router.use(verifyToken).route('/like').put(likePost);
router.use(verifyToken).route('/unlike').put(unlikePost);
router.use(verifyToken).route('/comment').put(commentPost);
router.use(verifyToken).route('/deletePost/:postid').delete(deletePost);

module.exports = router;