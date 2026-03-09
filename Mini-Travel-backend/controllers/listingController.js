import Listing from '../models/listing.js';
import User from '../models/user.js';

// --- Create a New Listing ---
export const createListing = async (req, res) => {
    try {
        const { title, location, description, imageUrl, price } = req.body;

        // Fetch the user to get the username for the listing
        const user = await User.findById(req.userId);

        const newListing = new Listing({
            title,
            location,
            description,
            imageUrl,
            price,
            creator: req.userId,
            creatorName: user.username // Requirement: Display creator name on the feed
        });

        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (err) {
        res.status(500).json({ message: "Error creating listing: " + err.message });
    }
};

// --- Get All Listings (Public Feed) ---
export const getAllListings = async (req, res) => {
    try {
        // Sort by createdAt descending (-1) to show newest listings first
        const listings = await Listing.find().sort({ createdAt: -1 });
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ message: "Error fetching listings" });
    }
};

// --- Update an Existing Listing ---
export const updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, location, description, imageUrl, price } = req.body;

        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Security: Check if the logged-in user is the owner of the listing
        if (listing.creator.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own listings" });
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            { title, location, description, imageUrl, price },
            { new: true } // Return the updated document
        );

        res.status(200).json(updatedListing);
    } catch (err) {
        res.status(500).json({ message: "Error updating listing: " + err.message });
    }
};

// --- Delete a Listing ---
export const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Security: Check if the logged-in user is the owner
        if (listing.creator.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own listings" });
        }

        await Listing.findByIdAndDelete(id);
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting listing: " + err.message });
    }
};