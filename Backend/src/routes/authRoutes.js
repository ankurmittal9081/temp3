import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import Employee from '../models/Employee.js';
import Paralegal from '../models/Paralegal.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

// This intelligent cookie policy works for both Render (https) and localhost (http)
const COOKIE_OPTS = {
  httpOnly: true,
  maxAge: 2 * 60 * 60 * 1000, // 2 hours
  // 'secure' must be true in production to allow cross-site cookies
  secure: process.env.NODE_ENV === 'production', 
  // 'lax' is fine for dev, but 'none' is required for production cross-site
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
};

// This helper is no longer used for login, but is kept for registration.
const sendTokenResponseOnRegister = (res, user, statusCode, message) => {
  if (!JWT_SECRET) throw new Error('JWT_SECRET not set.');
  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  res.cookie('token', token, COOKIE_OPTS);
  res.status(statusCode).json({ message, role: user.role, userId: user._id });
};

// Registration Logic (uses the helper)
router.post('/register', async (req, res, next) => {
    // ... your existing registration logic remains exactly the same ...
    // It should end by calling sendTokenResponseOnRegister(...)
});


// --- THE CRITICAL FIX IS HERE ---
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

    // 1. Create the JWT Token
    if (!JWT_SECRET) throw new Error('JWT_SECRET not set.');
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });

    // 2. Set the cookie on the response
    res.cookie('token', token, COOKIE_OPTS);

    // 3. **RETURN THE USER DATA IN THE RESPONSE BODY**
    // This is the key change that eliminates the race condition.
    res.status(200).json({
      message: '✅ Login successful',
      user: {
        id: user._id,
        role: user.role,
        fullName: user.fullName, // Send back any data the frontend might need immediately
      }
    });
    
  } catch (err) {
    next(err);
  }
});


// The rest of your authRoutes.js (logout, status) can remain the same
// as the previous robust versions.

// ✅ POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', COOKIE_OPTS); 
  res.json({ message: '✅ Logged out successfully' });
});

// ✅ GET /api/auth/status
router.get('/status', (req, res, next) => {
    // This function still works perfectly for checking the status on page load
    const token = req.cookies.token;
    if (!token) return res.status(200).json({ loggedIn: false });

    try {
        if (!JWT_SECRET) throw new Error('JWT_SECRET not set.');
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ loggedIn: true, user: { id: decoded.userId, role: decoded.role } });
    } catch (err) {
        // If token is invalid, clear it and respond logged out
        res.clearCookie('token', COOKIE_OPTS);
        res.status(200).json({ loggedIn: false });
    }
});


export default router;