import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
//create token after successful login

const generateToken = (userId) => {
    // payload = data we embed in token (keep minimal — no password!)
    // expiresIn = token invalid after 7 days
    // token in xxxx.yyyyy.zzzzz format
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
}

export const signup = async (req, res) => {
    const {name , email , password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({error: "All fields are required"});
    }

    // check if email is already in use

    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({error: "Email already in use"});
    }
    // hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user in database
    const user = await User.create({name, email, password: hashedPassword});
    const token = generateToken(user._id);
    res.status(201).json({
        message: "Signup successful",
        token : token,
        user : {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
}
export const login = async (req, res) => {
    const {email , password} = req.body;
    if(!email || !password) {
        return res.status(400).json({error: "Email and password are required"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({error: "User not found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({error: "Invalid password"});
    }
    const token = generateToken(user._id);
    res.status(200).json({
        message: "Login successful",
        token : token,
        user : {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    })
}

