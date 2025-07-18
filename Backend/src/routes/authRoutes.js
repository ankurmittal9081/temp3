import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import Employee from '../models/Employee.js';
import Paralegal from '../models/Paralegal.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_OPTS = {
  httpOnly: true,
  maxAge: 2 * 60 * 60 * 1000, // 2 hours
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

// Helper to generate and set token cookie
const sendTokenResponse = (res, user, statusCode, message) => {
  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  res.cookie('token', token, COOKIE_OPTS);
  res.status(statusCode).json({ message, role: user.role, userId: user._id });
};

// ✅ POST /api/auth/register - Unified registration endpoint
router.post('/register', async (req, res, next) => {
  const { fullName, email, password, aadhaarNumber, role, ...details } = req.body;

  if (!fullName || !email || !password || !role || !aadhaarNumber) {
    return res.status(400).json({ message: 'Core user fields (fullName, email, password, aadhaar, role) are required' });
  }

  try {
    if (await User.findOne({ email, isDeleted: false })) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    if (await User.findOne({ aadhaarNumber, isDeleted: false })) {
      return res.status(409).json({ message: 'Aadhaar already registered' });
    }

    const newUser = new User({ fullName, email, password, role, aadhaarNumber, ...details });
    await newUser.save();

    // Role-specific handling
    switch (role) {
      case 'admin':
        await Admin.create({ user: newUser._id, ...details });
        break;
      case 'employee':
        await Employee.create({ user: newUser._id, ...details });
        break;
      case 'paralegal':
        await Paralegal.create({ user: newUser._id, ...details });
        break;
    }
    
    sendTokenResponse(res, newUser, 201, '✅ Registration successful');
  } catch (err) {
    next(err);
  }
});

// ✅ POST /api/auth/login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email, isDeleted: false });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    sendTokenResponse(res, user, 200, '✅ Login successful');
  } catch (err) {
    next(err);
  }
});

// ✅ POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: '✅ Logged out successfully' });
});

// ✅ GET /api/auth/status
router.get('/status', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ loggedIn: true, user: { id: decoded.userId, role: decoded.role } });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

export default router;