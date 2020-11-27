const mongoose = require('mongoose');
const Post = mongoose.model("Post");

module.exports = {
    createPost: async (req, res) => {
        const { body } = req.body;
        // Post data validation
        if(body.trim() === ""){
            return res.status(400).josn({ body: "Body must not be empty" });
        }

        try {
            const post = new Post(req.body);
            const createdPost = await post.save();
            if(createdPost){
                return res.status(200).json({ createdPost, message: "Post created successfully"})
            }
        } catch(err){
            console.log(err);
            res.status(500).json({ general: "Something went wrong"})
        }
    },
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find();
            if(posts){
                return res.status(200).json({ posts })
            }
        } catch (err) {
            console.log(err);
        }
    }
}