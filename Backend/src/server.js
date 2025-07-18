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

// --- FINAL CORS CONFIGURATION ---
const allowedOrigin = process.env.CORS_ORIGIN;
if (!allowedOrigin) {
  console.error('FATAL ERROR: CORS_ORIGIN is not defined in environment variables.');
  process.exit(1);
}

// Log the origin that the server is configured to accept
console.log(`CORS Policy Enabled for Origin: ${allowedOrigin}`);

const corsOptions = {
  origin: (origin, callback) => {
    // Log every incoming request's origin for debugging purposes
    console.log(`--> [CORS Check] Incoming request from Origin: ${origin}`);
    
    // Allow if the origin matches our config, or if there's no origin (like for server-to-server)
    if (origin === allowedOrigin || !origin) {
      console.log(`✅ [CORS Check] PASSED for origin: ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ [CORS Check] FAILED for origin: ${origin}`);
      callback(new Error('CORS Error: This origin is not permitted by the server.'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// This is crucial for Express to trust the proxy headers set by Render
// It allows the `secure: true` cookie option to work correctly.
app.set('trust proxy', 1);

// --- OTHER MIDDLEWARES ---
app.use(express.json());
app.use(cookieParser());

// --- MASTER API ROUTER ---
const apiRouter = express.Router();

// Public Routes
apiRouter.get('/', (req, res) => res.send('NyayaSaathi API is Live.'));
apiRouter.use('/auth', authRoutes);

// Apply Authentication Middleware to all subsequent routes
apiRouter.use(authMiddleware);

// Protected Routes
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

// Mount the master router at the /api prefix
app.use('/api', apiRouter);

// Root health check
app.get('/', (req, res) => {
    res.status(200).send('NyayaSaathi Backend Service is running and healthy.');
});

// Centralized Error Handler
app.use(errorMiddleware);

// --- START SERVER ---
connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server connected to DB and running at port ${PORT}`));
}).catch(err => {
    console.error("Failed to connect to Database, server not started.", err);
});