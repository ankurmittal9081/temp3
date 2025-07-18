import { Router } from 'express';
import LegalIssue from '../models/LegalIssue.js';
import Document from '../models/Document.js';

const router = Router();

// This router provides dashboard-like functionality specifically for logged-in citizens.
// All routes here are already protected by the middleware in server.js.

// ✅ Get all Legal Issues for the logged-in Citizen
router.get('/issues', async (req, res, next) => {
    try {
        const issues = await LegalIssue.find({
            userId: req.user.userId,
            isDeleted: false
        }).populate('kiosk', 'location operatorName').populate('assignedParalegal', 'user');
        
        res.json({ issues });
    } catch (err) {
        next(err);
    }
});

// ✅ Get all Documents for the logged-in Citizen
router.get('/documents', async (req, res, next) => {
    try {
        const documents = await Document.find({
            userId: req.user.userId,
            isDeleted: false
        }).populate('issueId', 'issueType description');
        
        res.json({ documents });
    } catch (err) {
        next(err);
    }
});

export default router;