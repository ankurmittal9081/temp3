import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path'; // It's good practice to import built-in modules
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

// --- 1. CORS Configuration ---
const allowedOrigin = process.env.CORS_ORIGIN;
if (!allowedOrigin) {
  console.error('FATAL ERROR: CORS_ORIGIN is not defined in environment variables.');
  process.exit(1);
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests if origin matches or if there is no origin (e.g., server-to-server)
    if (origin === allowedOrigin || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error: The origin ${origin} is not allowed.`));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));


// --- 2. Standard Middlewares ---
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies


// --- 3. Master API Router Setup ---
const apiRouter = express.Router();

// Public Routes attached to apiRouter
// Responds to GET /api/
apiRouter.get('/', (req, res) => {
    res.send('✅ NyayaSaathi API is Live and Accessible.');
});
// Responds to /api/auth/...
apiRouter.use('/auth', authRoutes);

// Apply authentication middleware to all subsequent routes on apiRouter
apiRouter.use(authMiddleware);

// Protected Routes attached to apiRouter
// Note: no '/api' prefix inside these `use` calls
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


// --- 4. Mount the Master Router ---
// All requests starting with /api will be sent to apiRouter
app.use('/api', apiRouter);


// --- 5. Root Health Check ---
// A simple check to verify the server is running when you visit the base URL
app.get('/', (req, res) => {
    res.status(200).send('NyayaSaathi Backend Service is running and healthy.');
});


// --- 6. Centralized Error Handling ---
// This must be the LAST app.use() call
app.use(errorMiddleware);


// --- 7. Start the Server ---
// Connect to the database first, then listen for requests
connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server connected to DB and running at port ${PORT}`));
}).catch(err => {
    console.error("Failed to connect to Database, server not started.", err);
});