import express from 'express';
import { 
    createListing, 
    getAllListings, 
    getListingById, 
    updateListing, 
    deleteListing,
    searchListings // 1. Import the search controller
} from '../controllers/listingController.js';
import auth from '../middleware/auth.js'; 
import upload from '../middleware/upload.js'; 

const router = express.Router();

// --- SEARCH ROUTE MUST BE ABOVE /:id ---
router.get('/search', searchListings); 

// Public Feed
router.get('/', getAllListings);

// Get Single Listing
router.get('/:id', getListingById); 

// Protected Routes
router.post('/create', auth, upload.single('image'), createListing);
router.put('/:id', auth, upload.single('image'), updateListing);
router.delete('/:id', auth, deleteListing);

export default router;