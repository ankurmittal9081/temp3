import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import Employee from '../models/Employee.js';
import Paralegal from '../models/Paralegal.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

// With the rewrite rule, the browser sees a single site, so 'lax' is the
// more secure and correct cookie policy.
const COOKIE_OPTS = {
  httpOnly: true,
  maxAge: 2 * 60 * 60 * 1000,
  secure: true,
  sameSite: 'lax',
};

router.post('/register', async (req, res, next) => {
  const { fullName, email, password, aadhaarNumber, role, ...details } = req.body;
  if (!fullName || !email || !password || !role || !aadhaarNumber) {
    return res.status(400).json({ message: 'Core user fields are required' });
  }
  try {
    if (await User.findOne({ email, isDeleted: false })) return res.status(409).json({ message: 'Email already registered' });
    if (await User.findOne({ aadhaarNumber, isDeleted: false })) return res.status(409).json({ message: 'Aadhaar already registered' });
    
    const newUser = new User({ fullName, email, password, role, aadhaarNumber, ...details });
    await newUser.save();

    switch (role) {
      case 'admin': await Admin.create({ user: newUser._id, ...details }); break;
      case 'employee': await Employee.create({ user: newUser._id, ...details }); break;
      case 'paralegal': await Paralegal.create({ user: newUser._id, ...details }); break;
    }
    
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '2h' });
    res.cookie('token', token, COOKIE_OPTS);
    res.status(201).json({
      message: '✅ Registration successful',
      user: { id: newUser._id, role: newUser.role, fullName: newUser.fullName }
    });
  } catch (err) { next(err); }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
  try {
    const user = await User.findOne({ email, isDeleted: false });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
    res.cookie('token', token, COOKIE_OPTS);
    res.status(200).json({
      message: '✅ Login successful',
      user: { id: user._id, role: user.role, fullName: user.fullName }
    });
  } catch (err) { next(err); }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', COOKIE_OPTS);
  res.json({ message: '✅ Logged out successfully' });
});

router.get('/status', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(200).json({ loggedIn: false });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ loggedIn: true, user: { id: decoded.userId, role: decoded.role } });
    } catch (err) {
        res.clearCookie('token', COOKIE_OPTS);
        res.status(200).json({ loggedIn: false });
    }
});

export default router;