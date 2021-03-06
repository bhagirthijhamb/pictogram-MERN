const { verifyToken } = require('../utils/tokenService');
const Post = require('./postModel');
const { post } = require('./postRoutes');

module.exports = {
    getPosts: async (req, res) => {
            try {
                const posts = await Post.find().populate("author", "_id name imageUrl").populate("comments.postedBy", "_id name");
                if(posts){
                    return res.status(200).json(posts)
                }
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        },
    getSubscribedPosts: async (req, res) => {
        // console.log(req.user);
        // console.log('following', req.user.following);
        // console.log('followers', req.user.followers);
        try {
            // if author in following (if author is in the following list, then only return the post)
            const posts = await Post.find({ author: { $in: req.user.following }}).populate("author", "_id name imageUrl").populate("comments.postedBy", "_id name");
            if(posts){
                console.log(posts)
                return res.status(200).json(posts)
            }
        } catch(err){
            console.log(err);
            res.status(500).json({ message: 'Internal server error'})
        }
    },
    createPost: async(req, res) => {
            try {
                const { text, imageUrl } = req.body;
                // Post data validation
                if(text.trim() === "" || !imageUrl){
                    return res.status(400).json({ message: "Must not be empty" });
                }
                // req.user has the current signedin users details
                // because when we verified the user with jwt.verify() in verifyToken middleware (auth.js file). we attached userData to req.user
                req.user.password = undefined;
                const postData = new Post({
                    text,
                    imageUrl,
                    author: req.user
                })
                try {
                    const newPost = new Post(postData);
                    const post = await newPost.save();
                    if(post){
                        return res.status(200).json(post)
                    }
                } catch(err){
                    console.log(err);
                    throw err;
                }
            } catch(err){
                console.log(err);
                res.status(500).json({ general: "Something went wrong"})
            }
        },
    getMyPosts: async(req, res) => {
        // console.log(req.user)
        try {
            const myPosts = await Post.find({ author: req.user._id }).populate("author", "_id name");
            if(myPosts){
                res.json(myPosts)
            }
        } catch(err){
            console.log(err);
        }
    },
    likePost: async(req, res) => {
        try {
            const likedPost = await Post.findByIdAndUpdate(req.body.postId, {
                // $push to push into an array - { push to array: likes, what to push: req.user._id }  
                $push:{likes: req.user._id}
            }, { 
                new: true
            }).populate("author", "_id name").exec()
            // console.log('likedPost', likedPost);

            if(likedPost){
                return res.json(likedPost);
            }
        }  catch(err) {
            console.log(err);
            res.status(422).json({error: err})
        }
    },
    unlikePost: async(req, res) => {
        try {
            const unlikedPost = await Post.findByIdAndUpdate(req.body.postId, {
                // pull will remove the user from likes array
                $pull:{likes: req.user._id}
            }, { 
                new: true
            }).populate("author", "_id name").exec()

            if(unlikedPost){
                return res.json(unlikedPost)
            }
        }  catch(err) {
            console.log(err);
            res.status(422).json({error: err})
        }
    },
    commentPost: async(req, res) => {
        const comment = {
            text: req.body.text,
            postedBy: req.user._id
        }
        try {
            const commentedPost = await Post.findByIdAndUpdate(req.body.postId, {
                $push:{comments: comment}
            }, { 
                new: true
            }).populate("comments.postedBy", "_id name").populate("author", "_id name").exec()

            if(commentedPost){
                return res.json(commentedPost);
            }
        }  catch(err) {
            console.log(err);
            res.status(422).json({error: err})
        }
    },
    deletePost: async(req, res) => {
        try {
            const postToDelete = await Post.findOne({ _id: req.params.postid}).populate("author", "_id").exec()
            if(!postToDelete) {
                res.status(422).json({ error: 'post not found' });
            }
            if(postToDelete.author._id.toString() === req.user._id.toString()) {
                const result  = await postToDelete.remove();
                if(result){
                    res.json(result)
                }       
            }
        }catch (err) {
            console.log(err);
        }
    },
    deleteComment: async(req, res) => {
        try {
            // console.log('req.params', req.params)
            const commentToDelete = await Post.findByIdAndUpdate(req.params.postId, 
                {
                    $pull: {comments: { _id: req.params.commentId }}
                },
                {
                    new: true
                }).populate("comments.postedBy", "_id name")
                .populate("author", "_id name")
                .exec()
            // console.log(commentToDelete);
            if(commentToDelete){
                return res.json(commentToDelete)
            }
        }catch (err) {
            console.log(err);
        }
    }
}