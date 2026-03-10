import express from 'express';
import { 
    createListing, 
    getAllListings, 
    getListingById, // 1. මෙතනට මේක අලුතින් add කරන්න
    updateListing, 
    deleteListing 
} from '../controllers/listingController.js';
import auth from '../middleware/auth.js'; 
import upload from '../middleware/upload.js'; 

const router = express.Router();

// Public Feed - Accessible by anyone
router.get('/', getAllListings);

// Get Single Listing 
router.get('/:id', getListingById); 

// Create Listing - Protected & handles single image upload
router.post('/create', auth, upload.single('image'), createListing);

// Update Listing - Protected & handles optional image update
router.put('/:id', auth, upload.single('image'), updateListing);

// Delete Listing - Protected
router.delete('/:id', auth, deleteListing);

export default router;