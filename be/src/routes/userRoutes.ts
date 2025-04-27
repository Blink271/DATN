import express from 'express';
import { UserController } from '../controllers/userController';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();
const userController = new UserController();

router.post('/', asyncHandler(userController.createUser.bind(userController)));
router.get('/:id', asyncHandler(userController.getUser.bind(userController)));
router.get('/', userController.getAllUsers.bind(userController)); // New route
router.put('/:id', asyncHandler(userController.updateUser.bind(userController)));
router.delete('/:id', asyncHandler(userController.deleteUser.bind(userController)));

export default router;