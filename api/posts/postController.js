const { verifyToken } = require('../utils/tokenService');
const Post = require('./postModel');

module.exports = {
    getPosts: async (req, res) => {
            try {
                const posts = await Post.find().populate("author", "_id name");
                if(posts){
                    console.log(posts)
                    return res.status(200).json(posts)
                }
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        },
    createPost: async(req, res) => {
            try {
                const { text, imageUrl } = req.body;
                // Post data validation
                if(text.trim() === "" || !imageUrl){
                    return res.status(400).json({ message: "Must not be empty" });
                }
                console.log(req.body);
                console.log(req.user);
                console.log('in bac-end', text);
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
                $push:{likes: req.user._id}
            }, { 
                new: true
            }).exec()
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
                $pull:{likes: req.user._id}
            }, { 
                new: true
            }).exec()

            if(unlikedPost){
                return res.json(result)
            }
        }  catch(err) {
            console.log(err);
            res.status(422).json({error: err})
        }
    }

}