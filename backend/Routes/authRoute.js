import express from 'express';
import {login, register, googleAuth, verifyToken} from "../Controllers/authController.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token' , verifyToken);
router.post('/google', googleAuth);

export default router

