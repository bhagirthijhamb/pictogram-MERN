const User = require('./userModel');
const Post = require('./../posts/postModel');
const { validateSignupData, validateLoginData } = require('./../utils/validators');
const { createToken }  = require('./../utils/tokenService');
const { find } = require('./userModel');

const findUserByEmail = async(email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch(err){
        throw err;
    }
}

const findUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            imageUrl: user.imageUrl,
            bio: user.bio,
            website: user.website,
            followers: user.followers,
            following: user.following
        }
    } catch(ex) {
        throw(ex);
    }
}

module.exports =  {
    getUsers: async (req,res) => {
        const users = await User.find();
        if(users) return res.json(users);
    },
    createUser: async (req, res) => {
        const { name, email, password } = req.body;
        // Signup data Validation
        const { valid, errors } = validateSignupData(req.body);
        console.log(errors);
        // 400 - Bad request
        // 422 - Unprocessable enttiy, server has understood the request but cannot process it
        if(!valid) return res.status(422).json(errors);

        try {
            const foundUser = await findUserByEmail(email)
            if(foundUser) {
                return res.status(400).json({ error: `${email} already taken, try another email address.`})
            }    

            const newUser = new User(req.body);
            const user = await newUser.save();
            if(user){
                return res.status(201).json(user)
            }
        } catch(err) {
            console.log(err);
            res.status(500).json({ general: "Something went wrong, please try again"})
        } 
    },
    loginUser: async(req, res, next) => {
        const { email, password } = req.body;
        const { valid, errors } = validateLoginData(req.body);
        if(!valid) return res.status(422).json(errors);

        try {
            const user = await findUserByEmail(email)
            console.log(user);
            if(!user) {
                res.status(400).json({ message: "Invalid email or password"});
                return;
            } else {
                const isMatch = await user.comparePasswords(password);
                if(!isMatch){
                    res.status(400).json({ message: "Invalid email or password"});
                    return;
                } else {
                    // res.status(201).json({ messaage: "Successfully signed in"})
                    const token = createToken({ id: user._id }); // we pass an object with id/_id as key and saved user _id as value
                    // save token in the cookie
                    res.cookie('token', token);
                    // send an empty response back
                    res.status(200).send(user);
                }
            }   
        } catch(err) { // error from developer side // errors from user side are handeled above
            console.log(err);
            next(err);
        }

    },
    getMyDetails: async(req, res) => {
        try {
            const user = await findUserById(req.user.id);
            // console.log(user);
            if(user){
                res.json({ data: user });
            }
        } catch(err) {
            console.log(err);
            res.status(500).json({ message: 'Something went wrong'})
        }
    },
    getMyProfile: async(req, res) => {
        // console.log('req.user.id', req.user.id);
        try {
            const user = await User.findOne({ _id: req.user.id }).select("-password");
            // console.log(user);
            if(user) {
                // console.log(user.name)
                const userPosts = await Post.find({ author: user._id }).populate("author", "_id name").exec();
                if(userPosts){
                    // console.log(user, userPosts)
                    res.status(200).json({ user, userPosts });
                }
            }
        } catch (err) {
            res.status(404).json({ error: err })
        }
    },
    getUserDetails: async(req, res) => {
        // console.log(req.params.userId)
        try {
            const user = await User.findOne({ _id: req.params.userId}).select("-password");
            if(user){
                const userPosts = await Post.find({ author: req.params.userId }).populate("author", "_id name").exec();
                if(userPosts){
                    // console.log('user',user,'userPosts', user)
                    res.status(200).json({user, userPosts})
                }
            }
        } catch(err) {
            res.status(404).json({ error: err })
        }
    },
    followUser: async(req, res) => {
        try {
            const followedUser = await User.findByIdAndUpdate(req.body.followId, {
                $push: { followers: req.user.id }
            }, {
                new: true
            }
            )
            if(followedUser){
                try {
                    const followingUser = await User.findByIdAndUpdate(req.user.id, {
                        $push: { following: req.body.followId}
                    }, {
                        new: true
                    }
                    ).select("-password")
                    if(followingUser){
                        res.json({followedUser, followingUser})
                    }
                } catch(err) {
                    console.log(err)
                    return res.status(422).json({ error: err })
                }
            }
        } catch(err) {
            console.log(er);
            return res.status(422).json({ error: err })
        }
    },
    unfollowUser: async(req, res) => {
        console.log(req.user.id, req.body.unfollowId)
            try {
                const followedUser = await User.findByIdAndUpdate(req.body.unfollowId, {
                    $pull: { followers: req.user.id }
                }, {
                    new: true
                }
                ).select("-password")
                if(followedUser){
                    console.log('followedUser', followedUser);
                    try {
                        const followingUser = await User.findByIdAndUpdate(req.user.id, {
                            $pull: { following: req.body.unfollowId}
                        }, {
                            new: true
                        }
                        )
                        if(followingUser){
                            // console.log('followingUser', followingUser);
                            res.json({ followedUser, followingUser })
                    }
                 } catch(err) {
                     console.log(err)
                     return res.status(422).json({ error: err })
                 }
             }
        } catch(err) {
            console.log(er);
            return res.status(422).json({ error: err })
        }
    },
    editUserProfile: async (req, res) => {
        try {
            const { imageUrl, website, bio } = req.body
            const updatedUserProfile = await User.findByIdAndUpdate(req.user.id, {
                $set: { imageUrl, website, bio }
            }, {
                new: true
            })
            if(updatedUserProfile){
                const user =  {
                    _id: updatedUserProfile._id,
                    name: updatedUserProfile.name,
                    email: updatedUserProfile.email,
                    imageUrl: updatedUserProfile.imageUrl,
                    bio: updatedUserProfile.bio,
                    website: updatedUserProfile.website,
                    followers: updatedUserProfile.followers,
                    following: updatedUserProfile.following
                }
                res.json(user);
            }
        } catch(err){
            console.log(err);
        }
    },
    logoutUser: async (req, res) => {
        try {
            const expire = await res.cookie("token", "", { expires: new Date(0)});
            if (expire){
                const clear = await res.clearCookie('token');
                if(clear){
                    res.status(200).json('token deleted');
                }
            }
        } catch(err) {
            console.log(err)
        }
    }
}