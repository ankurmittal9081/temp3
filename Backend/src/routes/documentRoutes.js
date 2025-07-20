import { Router } from 'express';
import Document from '../models/Document.js';
import { softDeleteById } from '../utils/helpers.js';
import { upload } from '../middleware/multer.middleware.js'; // Import multer middleware
import { uploadOnCloudinary } from '../utils/cloudinary.js'; // Import Cloudinary uploader

const router = Router();

// ===================================================================
//  MODIFIED: The POST route now handles a file upload
// ===================================================================
// The `upload.single("documentFile")` middleware will intercept a file field named "documentFile"
router.post('/', upload.single("documentFile"), async (req, res, next) => {
  try {
    const { issueId, documentType } = req.body;
    
    // Check if a file was actually uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Document file is required." });
    }

    // Get the local path of the uploaded file from multer
    const documentLocalPath = req.file.path;
    
    // Upload the file to Cloudinary
    const documentUploadResponse = await uploadOnCloudinary(documentLocalPath);

    if (!documentUploadResponse) {
        return res.status(500).json({ message: "Failed to upload document to cloud storage." });
    }

    // Create the document record with the URL from Cloudinary
    const newDoc = await Document.create({
      userId: req.user._id, // Correctly use _id
      issueId,
      documentType,
      fileUrl: documentUploadResponse.url, // Save the secure URL from Cloudinary
      submissionStatus: 'submitted',
      isDeleted: false
    });

    res.status(201).json(newDoc);
  } catch (err) {
    next(err);
  }
});

// Get all documents for the logged-in user
router.get('/', async (req, res, next) => {
  try {
    const docs = await Document.find({ userId: req.user._id, isDeleted: false });
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

// Soft delete a document
router.delete('/:id', async (req, res, next) => {
  try {
    const doc = await softDeleteById(Document, req.params.id);
    res.json({ message: 'Document soft-deleted successfully', doc });
  } catch (err) {
    next(err);
  }
});

export default router;