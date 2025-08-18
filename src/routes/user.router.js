import express from "express";
const router = express.Router();
import { validateRequest } from "../midllewares/validateRequest.js";
import { login, logout, signup } from "../controllers/user.controller.js";
import passport from "passport";
import { loginUserSchema, registerUserSchema } from "../schemas/user.schema.js";




router.post('/signup', validateRequest(registerUserSchema), signup)
router.post('/login', validateRequest(loginUserSchema), passport.authenticate('local'), login)
router.get('/logout', logout);


export default router