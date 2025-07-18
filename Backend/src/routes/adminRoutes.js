import { Router } from 'express';
import Admin from '../models/Admin.js';
import { softDeleteById } from '../utils/helpers.js';

const router = Router();

// Get all active admins (protected by default middleware)
router.get('/', async (req, res, next) => {
  try {
    const admins = await Admin.find({ isDeleted: false }).populate('user', 'fullName email role');
    res.json(admins);
  } catch (err) {
    next(err);
  }
});

// Soft delete an admin by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const admin = await softDeleteById(Admin, req.params.id);
    res.json({ message: 'Admin soft-deleted successfully', admin });
  } catch (err) {
    next(err);
  }
});

export default router;