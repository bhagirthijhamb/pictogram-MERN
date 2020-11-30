const User = require('./userModel');
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
            id: user._id,
            name: user.name,
            email: user.email
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
        const { name, email, password, confirmPassword } = req.body;
        const { valid, errors } = validateSignupData(req.body);
        // 400 - Bad request
        // 422 - Unprocessable enttiy, server has understood the request but cannot process it
        if(!valid) return res.status(422).json(errors);
        // res.json({message: "created successfully"})

        try {
            const foundUser = await findUserByEmail(email)
            if(foundUser) {
                return res.status(400).json({ error: `Email address ${email} already taken, try another email address.`})
            }    

            const newUser = new User(req.body);
            const user = await newUser.save();
            // return res.status(200).json({ message: "User Created successfully" })
            if(user){
                return res.status(201).json({ user: [user], message: "User Created successfully" })
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
            if(!user) {
                res.status(400).json({ message: "Invalid email or password"});
                return;
            } else {
                // if(user && user.password === password) {
                //     res.json({ user: [user]})
                // } else { 
                //     next(new Error('unauthorized'))
                // }
                const isMatch = await user.comparePasswords(password);
                if(!isMatch){
                    res.status(400).json({ message: "Invalid email or password"});
                    return;
                } else {
                    const token = createToken({ id: user._id });
                    // save token in the cookie
                    res.cookie('token', token);
                    // send an empty response back
                    res.status(200).send({});
                }
            }   
        } catch(err) {
            console.log(err);
            next(err);
        }

    },
    getMyDetails: async(req, res) => {
        try {
            // console.log('from /me route', req.user);
            // const user = await findUserById(req.user.id);
            res.json({ user: req.user });
        } catch(err) {
            console.log(err);
            res.status(500).json({ message: 'Something went wrong'})
        }
    }
}