const User = require('../models/User');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }


        const newUser = new User({
            name,
            email,
            password
        });


        await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully!',
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY }
        );
        
        
        res.cookie('token', token, {
            httpOnly: true, 
            secure: false, 
            sameSite: 'None', 
            maxAge: 3600000,  
          });
        console.log("Cookies after login:", res); 

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
    return res.status(200).json({ message: 'Logged out successfully' });
};

const status = (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({
            message: "User is authenticated",
            isloggedin:true,
            user: decoded, 
        });
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Unauthorized", error: err.message });
    }
};
  
module.exports = { registerUser, loginUser,logout,status };
