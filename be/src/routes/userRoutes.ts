// src/routes/UserRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateJWT, authorizeRole } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';
import rateLimit from 'express-rate-limit';

const router = Router();
const userController = new UserController();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many login attempts, please try again later'
});

// Public routes
router.post('/register', asyncHandler(userController.register.bind(userController)));
router.post('/login', loginLimiter, asyncHandler(userController.login.bind(userController)));
router.post('/refresh-token', asyncHandler(userController.refreshToken.bind(userController)));

// Protected routes
router.get('/profile', authenticateJWT, asyncHandler(userController.getProfile.bind(userController)));
router.put('/profile', authenticateJWT, asyncHandler(userController.updateProfile.bind(userController)));

// Admin routes
router.get(
  '/', 
  authenticateJWT, 
  authorizeRole('admin'), 
  asyncHandler(userController.getAllUsers.bind(userController))
);
router.get(
  '/:id', 
  authenticateJWT, 
  authorizeRole('admin'), 
  asyncHandler(userController.getUserById.bind(userController))
);
router.delete(
  '/:id', 
  authenticateJWT, 
  authorizeRole('admin'), 
  asyncHandler(userController.deleteUser.bind(userController))
);

export default router;