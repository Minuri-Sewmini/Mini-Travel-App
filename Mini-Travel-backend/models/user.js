import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // Added missing field
    lastName: { type: String, required: true },  // Added missing field
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);