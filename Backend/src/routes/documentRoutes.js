import { Router } from 'express';
import Document from '../models/Document.js';
import { softDeleteById } from '../utils/helpers.js';

const router = Router();

// Create a new document for the logged-in user
router.post('/', async (req, res, next) => {
  try {
    const { issueId, documentType, fileUrl } = req.body;
    const newDoc = await Document.create({
      userId: req.user.userId,
      issueId,
      documentType,
      fileUrl,
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
    const docs = await Document.find({ userId: req.user.userId, isDeleted: false });
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