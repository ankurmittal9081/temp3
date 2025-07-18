import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import authMiddleware from './middleware/authMiddleware.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import citizenRoutes from './routes/citizenRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import kioskRoutes from './routes/kioskRoutes.js';
import legalIssueRoutes from './routes/legalIssueRoutes.js';
import paralegalRoutes from './routes/paralegalRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import userRoutes from './routes/userRoutes.js';
import voiceQueryRoutes from './routes/voiceQueryRoutes.js';

// Initialize App
const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

// Middlewares
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://nyayasaathi-frontend.onrender.com',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Temporarily log the denied origin to help with debugging
      console.log(`CORS Error: Origin ${origin} not allowed.`); 
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// --- ROUTES ---

// Public Routes
app.get('/', (req, res) => {
  res.send('✅ NyayaSaathi Backend is Live. Use /api for API routes.');
});
app.use('/api/auth', authRoutes);


// All subsequent routes are protected by default
app.use(authMiddleware);

// Protected Routes
app.get('/api/protected', (req, res) => {
  res.json({ message: '✅ You accessed a protected route!', user: req.user });
});

app.use('/api/admins', adminRoutes);
app.use('/api/citizens', citizenRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/kiosks', kioskRoutes);
app.use('/api/issues', legalIssueRoutes);
app.use('/api/paralegals', paralegalRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/voicequeries', voiceQueryRoutes);


// Centralized Error Handler (Must be the last middleware)
app.use(errorMiddleware);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));