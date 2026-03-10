import multer from 'multer';

// We use memoryStorage because we are sending the file to Supabase, not saving it locally
const storage = multer.memoryStorage();

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export default upload;