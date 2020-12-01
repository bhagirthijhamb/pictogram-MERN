const { verifyToken } = require('../utils/tokenService');
const Post = require('./postModel');

module.exports = {
    getPosts: async (req, res) => {
            try {
                const posts = await Post.find().populate("author", "_id name");
                if(posts){
                    return res.status(200).json({ posts })
                }
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        },
    createPost: async(req, res) => {
            try {
                const { text } = req.body;
                // Post data validation
                if(text.trim() === ""){
                    return res.status(400).json({ message: "Must not be empty" });
                }
                console.log(req.user);
                req.user.password = undefined;
                const postData = new Post({
                    text,
                    author: req.user 
                })
                try {
                    const newPost = new Post(postData);
                    const post = await newPost.save();
                    if(post){
                        return res.status(200).json({ id: post._id, post, message: "Post created successfully"})
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
    
}