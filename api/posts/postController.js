const { verifyToken } = require('../utils/tokenService');
const Post = require('./postModel');

// const findUserByEmail = async () => {

// }


module.exports = {
    getPosts: async (req, res) => {
            try {
                const posts = await Post.find();
                if(posts){
                    return res.status(200).json({ posts })
                }
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });

            }
        },
    createPost: async(req,res) => {
            try {
                const { body } = req;
                // Post data validation
                if(body.text.trim() === ""){
                    return res.status(400).json({ message: "Must not be empty" });
                }
                try {
                    const newPost = new Post({ text: body.text});
                    const post = await newPost.save();
                    if(post){
                        return res.status(200).json({ id: post._id, message: "Post created successfully"})
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