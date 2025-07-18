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

// --- CORS Configuration ---
// Read the allowed origin from the environment variables.
const allowedOrigin = process.env.CORS_ORIGIN;
if (!allowedOrigin) {
  console.error('FATAL ERROR: CORS_ORIGIN is not defined in environment variables.');
  process.exit(1); // Exit if the configuration is missing
}

const corsOptions = {
  // Use a function for the origin to handle cases like mobile apps or server-to-server requests
  // where the 'origin' header might be undefined.
  origin: (origin, callback) => {
    // If the incoming origin is the one we've allowed, or if there's no origin, allow it.
    if (origin === allowedOrigin || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error: The origin ${origin} is not allowed.`));
    }
  },
  credentials: true, // This is crucial for sending cookies
};

app.use(cors(corsOptions));


// --- Other Middlewares ---
app.use(express.json());
app.use(cookieParser());

// --- ROUTES ---

// Create a master router for all API routes
const apiRouter = express.Router();

// Public Routes
apiRouter.get('/', (req, res) => {
    res.send('✅ NyayaSaathi API is Live.');
});
apiRouter.use('/auth', authRoutes);


// Apply authentication middleware to all subsequent routes on the apiRouter
apiRouter.use(authMiddleware);

// Protected Routes
apiRouter.get('/protected', (req, res) => {
  res.json({ message: '✅ You accessed a protected route!', user: req.user });
});

apiRouter.use('/admins', adminRoutes);
apiRouter.use('/citizens', citizenRoutes);
apiRouter.use('/documents', documentRoutes);
apiRouter.use('/employees', employeeRoutes);
apiRouter.use('/kiosks', kioskRoutes);
apiRouter.use('/issues', legalIssueRoutes);
apiRouter.use('/paralegals', paralegalRoutes);
apiRouter.use('/subscriptions', subscriptionRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/voicequeries', voiceQueryRoutes);


// Mount the master apiRouter under the single /api path
app.use('/api', apiRouter);


// A root health check to easily verify that the service is running.
app.get('/', (req, res) => {
    res.send('NyayaSaathi Backend Service is running.');
});


// Centralized Error Handler (Must be the last middleware)
app.use(errorMiddleware);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));