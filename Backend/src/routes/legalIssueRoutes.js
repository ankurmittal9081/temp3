import { Router } from 'express';
import LegalIssue from '../models/LegalIssue.js';
import { softDeleteById } from '../utils/helpers.js';

const router = Router();

// Create a new legal issue for the logged-in user
router.post('/', async (req, res, next) => {
  try {
    const issue = await LegalIssue.create({
      ...req.body,
      userId: req.user.userId,
      isDeleted: false
    });
    res.status(201).json(issue);
  } catch (err) {
    next(err);
  }
});

// Get all legal issues for the logged-in user
router.get('/', async (req, res, next) => {
  try {
    const issues = await LegalIssue.find({ userId: req.user.userId, isDeleted: false });
    res.json(issues);
  } catch (err) {
    next(err);
  }
});

// Soft delete a legal issue
router.delete('/:id', async (req, res, next) => {
  try {
    const issue = await softDeleteById(LegalIssue, req.params.id);
    res.json({ message: 'Legal Issue soft-deleted successfully', issue });
  } catch (err) {
    next(err);
  }
});

export default router;