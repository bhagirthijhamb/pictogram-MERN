const express = require('express');
const router = express.Router();
const { getPosts, createPost }  = require('./postController');

const Post = require('./postModel');

router.route('/')
    .get(getPosts)
    .post(createPost);

module.exports = router;