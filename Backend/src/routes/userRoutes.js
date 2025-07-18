import { Router } from 'express';
import User from '../models/User.js';
import { softDeleteById } from '../utils/helpers.js';

const router = Router();

// Get all non-deleted users (admin functionality)
router.get('/', async (req, res, next) => {
  try {
    // Optional: Add role-based access check here if needed
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ message: 'Access denied.' });
    // }
    const users = await User.find({ isDeleted: false }).select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Get profile of the currently logged-in user
router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});


// Soft delete a user by ID (admin functionality)
router.delete('/:id', async (req, res, next) => {
  try {
    // Optional: Add role-based access check here
    const user = await softDeleteById(User, req.params.id);
    res.json({ message: 'User soft-deleted successfully', user });
  } catch (err) {
    next(err);
  }
});

export default router;