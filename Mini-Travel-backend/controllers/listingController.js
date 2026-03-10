import { createClient } from '@supabase/supabase-js';
import Listing from '../models/listing.js';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase Client
const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_ANON_KEY 
);

// --- 1. Create a New Listing with Supabase Upload ---
export const createListing = async (req, res) => {
    try {
        const { title, location, description, price } = req.body;
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        let imageUrl = "";

        if (req.file) {
            const fileName = `${Date.now()}_${req.file.originalname}`;
            
            const { data, error } = await supabase.storage
                .from('minitravel') 
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                    upsert: false
                });

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from('minitravel')
                .getPublicUrl(fileName);

            imageUrl = publicUrlData.publicUrl;
        }

        const newListing = new Listing({
            title,
            location,
            description,
            imageUrl,
            price,
            creator: req.userId,
            creatorName: user.username
        });

        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (err) {
        res.status(500).json({ message: "Error creating listing: " + err.message });
    }
};

// --- 2. Get All Listings (For Public Feed) ---
export const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find().sort({ createdAt: -1 });
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ message: "Error fetching listings" });
    }
};

// --- 3. Get a Single Listing by ID (For Detail Page) ---
// මෙම කොටස අලුතින් එකතු කරන ලදී. එවිට 404 error එක විසඳේ.
export const getListingById = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        res.status(200).json(listing);
    } catch (err) {
        res.status(500).json({ message: "Error fetching listing: " + err.message });
    }
};

// --- 4. Update Listing with Supabase ---
export const updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, location, description, price } = req.body;
        const listing = await Listing.findById(id);

        if (!listing) return res.status(404).json({ message: "Listing not found" });
        if (listing.creator.toString() !== req.userId) return res.status(403).json({ message: "Unauthorized" });

        let imageUrl = listing.imageUrl;
        if (req.file) {
            const fileName = `${Date.now()}_${req.file.originalname}`;
            
            const { error } = await supabase.storage
                .from('minitravel')
                .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

            if (error) throw error;
            imageUrl = supabase.storage.from('minitravel').getPublicUrl(fileName).data.publicUrl;
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            { title, location, description, imageUrl, price },
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (err) {
        res.status(500).json({ message: "Error updating: " + err.message });
    }
};

// --- 5. Delete Listing ---
export const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        if (listing.creator.toString() !== req.userId) return res.status(403).json({ message: "Unauthorized" });

        await Listing.findByIdAndDelete(id);
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting: " + err.message });
    }
};