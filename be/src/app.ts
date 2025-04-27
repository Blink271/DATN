import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Error handling middleware
// app.use(errorHandler);

export default app;