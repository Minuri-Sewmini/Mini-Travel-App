import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import your routes
// Note: In ES Modules, you MUST include the .js extension for local files
import userRoute from './routes/userRoute.js'; 
import listingRoutes from './routes/listingRoutes.js'

// Load environment variables
dotenv.config();

const app = express();

// Middleware
// Enable CORS for frontend connection
app.use(cors()); 
// Parse incoming JSON requests
app.use(express.json()); 

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(err => console.log("MongoDB Connection Error: ", err));

// Use the user routes
app.use('/api/users', userRoute);
app.use('/api/listings', listingRoutes );

// Basic Route for testing the API
app.get('/', (req, res) => {
    res.send("Travel App API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});