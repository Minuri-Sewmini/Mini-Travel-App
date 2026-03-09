import express from 'express';
// registerUser ekka loginUser function ekath import karaganna
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// 1. Route for user registration
router.post('/register', registerUser);

// 2. Route for user login
router.post('/login', loginUser);

export default router;