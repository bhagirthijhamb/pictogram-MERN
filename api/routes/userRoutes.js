// Signup route
    // validate for isEmpty and isEmail
    // signup user
    // return token

// Login route
    // validate for isEmpty and isEmail
    // login user
    // return token


// get own user details
    // 
const mongoose = require('mongoose');
const User = mongoose.model("User")

const { validateSignupData } = require('./../utils/validators');

module.exports = {
    getUsers: async (req,res) => {
        const users = await User.find();
        if(users) return res.json(users);
    },
    signup: async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;
        console.log(req.body)
        const { valid, errors } = validateSignupData(req.body);
        // 400 - Bad request
        // 422 - Unprocessable enttiy, server has understood the request but cannot process it
        if(!valid) return res.status(422).json(errors);
        // res.json({message: "created successfully"})

        try {
            const existingUser = await User.findOne({ email: email })
            if(existingUser) {
                return res.status(400).json({ error: "Email address already taken, try another email address."})
            }    

            const user = new User(req.body);
            const createdUser = await user.save();
            // return res.status(200).json({ message: "User Created successfully" })
            if(createdUser){

                return res.status(200).json({ createdUser, message: "User Created successfully" })
            }
        } catch(err) {
            console.log(err);
            res.status(500).json({ general: "Something went wrong, please try again"})
        }
        
    }
}