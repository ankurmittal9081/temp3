import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import Employee from '../models/Employee.js';
import Paralegal from '../models/Paralegal.js';
import verifyJWT from '../middleware/authMiddleware.js';

const router = Router();

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
};

// --- PUBLIC ROUTES ---
router.post('/register', async (req, res, next) => {
    const { fullName, email, password, aadhaarNumber, role, ...details } = req.body;
    if (!fullName || !email || !password || !role || !aadhaarNumber) { return res.status(400).json({ success: false, message: 'Core fields required' }); }
    try {
        if (await User.findOne({ email, isDeleted: false })) return res.status(409).json({ success: false, message: 'Email already registered' });
        if (await User.findOne({ aadhaarNumber, isDeleted: false })) return res.status(409).json({ success: false, message: 'Aadhaar already registered' });
        
        const newUser = new User({ fullName, email, password, role, aadhaarNumber, ...details });
        await newUser.save();
        switch (role) {
            case 'admin': await Admin.create({ user: newUser._id, ...details }); break;
            case 'employee': await Employee.create({ user: newUser._id, ...details }); break;
            case 'paralegal': await Paralegal.create({ user: newUser._id, ...details }); break;
        }
        const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
        return res.status(201).json({ success: true, data: createdUser, message: "User registered. Please log in." });
    } catch (err) { next(err); }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) { return res.status(400).json({ success: false, message: "Email and password are required" }); }
    try {
        const user = await User.findOne({ email, isDeleted: false });
        if (!user) { return res.status(404).json({ success: false, message: "User does not exist" }); }
        
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) { return res.status(401).json({ success: false, message: "Invalid credentials" }); }
        
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        
        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json({ success: true, data: { user: loggedInUser }, message: "Login successful" });
    } catch(err) { next(err); }
});

router.post('/refresh-token', async (req, res, next) => {
    const incomingRefreshToken = req.cookies.refreshToken;
    if (!incomingRefreshToken) { return res.status(401).json({ success: false, message: "No refresh token" }); }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
        if (!user || incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({ success: false, message: "Refresh token is invalid or expired" });
        }
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);
        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", newRefreshToken, cookieOptions)
            .json({ success: true, data: {}, message: "Access token refreshed" });
    } catch (error) {
        return res.status(401).json({ success: false, message: error?.message || "Invalid refresh token" });
    }
});

// --- PROTECTED ROUTES ---
router.use(verifyJWT);

router.post('/logout', async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } }, { new: true });
        return res
            .status(200)
            .clearCookie("accessToken", cookieOptions)
            .clearCookie("refreshToken", cookieOptions)
            .json({ success: true, data: {}, message: "User logged out" });
    } catch(err) { next(err); }
});

router.get('/current-user', (req, res) => {
    return res.status(200).json({ success: true, data: req.user, message: "Current user fetched successfully" });
});

export default router;