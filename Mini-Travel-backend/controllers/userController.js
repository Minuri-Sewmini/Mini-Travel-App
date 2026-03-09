import User from '../models/user.js';

// Controller for user registration
export const registerUser = async (req, res) => {
    // 1. Log incoming data to see if frontend is sending it correctly
    console.log("Incoming Registration Request:", req.body);

    try {
        const { firstName, lastName, username, email, password } = req.body;

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Registration failed: User already exists with email:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        // 3. Create new user instance
        const newUser = new User({ 
            firstName, 
            lastName, 
            username, 
            email, 
            password 
        });

        // 4. Attempt to save to database
        const savedUser = await newUser.save();
        
        // 5. Success log
        console.log("✅ SUCCESS: User saved to MongoDB:", savedUser);

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        // 6. Detailed error log in terminal
        console.error("❌ DATABASE SAVE ERROR:", err.message);
        res.status(500).json({ message: "Server Error: " + err.message });
    }
};