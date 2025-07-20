import { Router } from 'express';
import LegalIssue from '../models/LegalIssue.js';
// import Notification from '../models/Notification.js'; // <-- REMOVED: This was causing the error
import { softDeleteById } from '../utils/helpers.js';

const router = Router();

// Create a new legal issue for the logged-in user
router.post('/', async (req, res, next) => {
  try {
    const issue = await LegalIssue.create({
      ...req.body,
      userId: req.user._id,
      isDeleted: false
    });
    res.status(201).json(issue);
  } catch (err) {
    next(err);
  }
});

// This route is for admins to get ALL issues.
router.get('/', async (req, res, next) => {
  try {
    const issues = await LegalIssue.find({ isDeleted: false });
    res.json(issues);
  } catch (err) {
    next(err);
  }
});

// PUT route for updating an issue
router.put('/:id', async (req, res, next) => {
    try {
        const issueId = req.params.id;
        
        const updatedIssue = await LegalIssue.findByIdAndUpdate(
            issueId,
            req.body,
            { new: true }
        );

        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        // ===================================================================
        //  REMOVED: All notification-related logic has been commented out
        //  or removed since the feature was skipped.
        // ===================================================================
        // if (status) {
        //     const message = `The status of your issue "${updatedIssue.issueType}" has been updated to ${status}.`;
        //     const notification = await Notification.create({...});
        //     // Socket logic would go here
        // }
        
        res.json(updatedIssue);
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