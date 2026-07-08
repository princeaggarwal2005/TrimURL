import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

export const protect = async (req , res , next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: "Unauthorized"});
    }

    // strip "Bearer " from the token, th browser added it
    const token = authHeader.split(" ")[1];
    try {
        // verify token and get user id from payload, if expired/invalid, it throw error
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.userId).select("-password");
        if(!req.user) {
            return res.status(401).json({error: "Unauthorized"});
        }
        next();
    } catch (error) {
        return res.status(401).json({error: "Unauthorized - invalid token"});
    }
};