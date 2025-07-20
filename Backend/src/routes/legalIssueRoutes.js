import { Router } from 'express';
import LegalIssue from '../models/LegalIssue.js';
import Notification from '../models/Notification.js';
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


router.get('/', async (req, res, next) => {
  try {
    // Optional: You could add a role check here to ensure only admins can call this
    // if (req.user.role !== 'admin') {
    //    return res.status(403).json({ message: "Access denied." });
    // }
    const issues = await LegalIssue.find({ isDeleted: false });
    res.json(issues);
  } catch (err) {
    next(err);
  }
});


// PUT route for updating an issue and sending a notification
router.put('/:id', async (req, res, next) => {
    try {
        const issueId = req.params.id;
        const { status } = req.body;

        const updatedIssue = await LegalIssue.findByIdAndUpdate(
            issueId,
            req.body,
            { new: true }
        );

        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        if (status) {
            const message = `The status of your issue "${updatedIssue.issueType}" has been updated to ${status}.`;
            const notification = await Notification.create({
                userId: updatedIssue.userId,
                message: message,
                link: '/dashboard'
            });
            // Socket logic would go here if implemented
        }
        
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