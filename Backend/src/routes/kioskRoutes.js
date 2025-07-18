import { Router } from 'express';
import Kiosk from '../models/Kiosk.js';
import { softDeleteById } from '../utils/helpers.js';

const router = Router();

// Create a new Kiosk
router.post('/', async (req, res, next) => {
  try {
    const kiosk = await Kiosk.create({ ...req.body, isDeleted: false });
    res.status(201).json(kiosk);
  } catch (err) {
    next(err);
  }
});

// Get all active kiosks
router.get('/', async (req, res, next) => {
  try {
    const kiosks = await Kiosk.find({ isDeleted: false });
    res.json(kiosks);
  } catch (err) {
    next(err);
  }
});

// Soft delete a kiosk
router.delete('/:id', async (req, res, next) => {
  try {
    const kiosk = await softDeleteById(Kiosk, req.params.id);
    res.json({ message: 'Kiosk soft-deleted successfully', kiosk });
  } catch (err) {
    next(err);
  }
});

export default router;