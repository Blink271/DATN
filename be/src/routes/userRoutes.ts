import * as express from 'express';
import { UserController } from '../controllers/userController';
import { asyncHandler, BadRequestError } from '../utils/errors';

const router = express.Router();
const userController = new UserController();

router.post(
  '/register',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { name, email, password, phone, address, role } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      throw new BadRequestError('Name must be at least 2 characters');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestError('Invalid email format');
    }
    if (!password || password.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters');
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      throw new BadRequestError('Phone number must be 10 digits');
    }
    if (address && address.length > 200) {
      throw new BadRequestError('Address must be less than 200 characters');
    }
    if (role && !['admin', 'user'].includes(role)) {
      throw new BadRequestError('Invalid role');
    }

    await userController.register(req, res);
  })
);

router.post(
  '/addUser',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { name, email, password, phone, address, role } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      throw new BadRequestError('Name must be at least 2 characters');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestError('Invalid email format');
    }
    if (!password || password.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters');
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      throw new BadRequestError('Phone number must be 10 digits');
    }
    if (address && address.length > 200) {
      throw new BadRequestError('Address must be less than 200 characters');
    }
    if (role && !['admin', 'user'].includes(role)) {
      throw new BadRequestError('Invalid role');
    }

    await userController.addUser(req, res);
  })
);

router.post(
  '/login',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestError('Invalid email format');
    }
    if (!password) {
      throw new BadRequestError('Password is required');
    }

    await userController.login(req, res);
  })
);

router.get(
  '/',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    await userController.getAllUsers(req, res);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError('Invalid user ID');
    }
    await userController.getUserById(req, res);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const { name, email, phone, address, role } = req.body;

    // Validation
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError('Invalid user ID');
    }
    if (name && (typeof name !== 'string' || name.trim().length < 2)) {
      throw new BadRequestError('Name must be at least 2 characters');
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestError('Invalid email format');
    }
    if (phone && !/^\d{10}$/.test(phone)) {
      throw new BadRequestError('Phone number must be 10 digits');
    }
    if (address && address.length > 200) {
      throw new BadRequestError('Address must be less than 200 characters');
    }
    if (role && !['admin', 'user'].includes(role)) {
      throw new BadRequestError('Invalid role');
    }

    await userController.updateUser(req, res);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError('Invalid user ID');
    }
    await userController.deleteUser(req, res);
  })
);

export default router;