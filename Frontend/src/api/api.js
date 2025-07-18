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
  'http://localhost:5173',
  'https://nyayasaathi-app.onrender.com', // Your live frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// --- ROUTES ---

// Create a master router for the API
const apiRouter = express.Router();

// Public Routes (on the apiRouter)
apiRouter.get('/', (req, res) => { // This will now be at /api/
    res.send('✅ NyayaSaathi API is Live.');
});
apiRouter.use('/auth', authRoutes);


// All subsequent routes on the apiRouter are protected by default
apiRouter.use(authMiddleware);

// Protected Routes (on the apiRouter)
apiRouter.get('/protected', (req, res) => {
  res.json({ message: '✅ You accessed a protected route!', user: req.user });
});

apiRouter.use('/admins', adminRoutes);
apiRouter.use('/citizens', citizenRoutes);
apiRouter.use('/documents', documentRoutes);
api-router.use('/employees', employeeRoutes);
apiRouter.use('/kiosks', kioskRoutes);
apiRouter.use('/issues', legalIssueRoutes);
apiRouter.use('/paralegals', paralegalRoutes);
apiRouter.use('/subscriptions', subscriptionRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/voicequeries', voiceQueryRoutes);


// Mount the master apiRouter under the /api path
app.use('/api', apiRouter);


// A health check for the root domain, helps verify the service is running.
app.get('/', (req, res) => {
    res.send('NyayaSaathi Backend Service is running.');
});


// Centralized Error Handler (Must be the last middleware)
app.use(errorMiddleware);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));