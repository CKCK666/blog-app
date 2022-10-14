import express from 'express';
import { signin, signup } from '../controller/auth.js';
const router = express.Router();

//user signIn
router.post('/signin', signin);

//user signUp
router.post('/signup',signup);

export default router;
