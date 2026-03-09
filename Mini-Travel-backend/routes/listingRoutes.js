import express from 'express';
import { 
    createListing, 
    getAllListings, 
    updateListing, 
    deleteListing 
} from '../controllers/listingController.js';
import auth from '../middleware/auth.js'; 

const router = express.Router();

// Public Feed - Accessible by anyone
router.get('/', getAllListings);

// Create Listing - Protected: Only logged-in users
router.post('/create', auth, createListing);

// Update Listing - Protected: Only the owner of the listing
router.put('/:id', auth, updateListing);

// Delete Listing - Protected: Only the owner of the listing
router.delete('/:id', auth, deleteListing);

export default router;