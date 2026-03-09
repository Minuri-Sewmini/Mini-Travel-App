import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// --- 1. User Registration ---
export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, confirmPassword } = req.body;


        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        // Password Encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            firstName, 
            lastName, 
            username, 
            email, 
            password: hashedPassword 
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });

    } catch (err) {
        // Handle MongoDB unique index errors
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({ message: `${field} already exists!` });
        }
        res.status(500).json({ message: "Server Error: " + err.message });
    }
};

// --- 2. User Login ---
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        res.status(200).json({ 
            message: "Login successful!",
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};