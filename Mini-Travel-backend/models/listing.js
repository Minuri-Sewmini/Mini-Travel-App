import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Experience Title
    },
    location: {
        type: String,
        required: true // Location
    },
    description: {
        type: String,
        required: true // Short Description
    },
    imageUrl: {
        type: String,
        required: true // Image URL
    },
    price: {
        type: Number,
        required: false // Price is optional
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    creatorName: {
        type: String,
        required: true // Display name of the host
    }
}, { 
    timestamps: true, // Automatically manages createdAt and updatedAt
    toJSON: { virtuals: true }, // Ensures virtual 'id' is included in JSON
    toObject: { virtuals: true } 
});

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;