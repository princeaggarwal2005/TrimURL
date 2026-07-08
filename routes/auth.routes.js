import {  Router } from "express";
import {signup, login} from "../controllers/auth.controller.js";
import { authLimiter } from "../middleware/rateLimiter.middleware.js";

const router = Router();

router.post("/signup",authLimiter, signup); // POST/auth/signup
router.post("/login",authLimiter, login); // POST/auth/login

export default router;