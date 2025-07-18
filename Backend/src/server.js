import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import authMiddleware from './middleware/authMiddleware.js';

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

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigin = process.env.CORS_ORIGIN;
if (!allowedOrigin) {
  console.error('FATAL ERROR: CORS_ORIGIN is not defined.');
  process.exit(1);
}
const corsOptions = { origin: allowedOrigin, credentials: true };
app.use(cors(corsOptions));
app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());

const apiRouter = express.Router();
apiRouter.get('/', (req, res) => res.send('API is Live'));
apiRouter.use('/auth', authRoutes);
apiRouter.use(authMiddleware);
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
app.use('/api', apiRouter);

app.get('/', (req, res) => res.send('Backend is running.'));
app.use(errorMiddleware);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server connected to DB and running at port ${PORT}`));
}).catch(err => console.error("Failed to start server", err));