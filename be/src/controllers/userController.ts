import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware'; // Nhập AuthRequest
import { UserService } from '../services/userService';
import { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
    try {
      const user = await this.userService.register(req.body);
      const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        user: this.sanitizeUser(user),
        accessToken,
        refreshToken
      });
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await this.userService.login(email, password);
      
      res.json({
        user: this.sanitizeUser(user),
        accessToken,
        refreshToken
      });
    } catch (error: any) {
      res.status(error.statusCode || 401).json({ message: error.message });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { userId, refreshToken } = req.body;
      const accessToken = await this.userService.refreshToken(userId, refreshToken);
      res.json({ accessToken });
    } catch (error: any) {
      res.status(error.statusCode || 401).json({ message: error.message });
    }
  }

  async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const user = await this.userService.getProfile(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const updatedUser = await this.userService.updateUser(
        req.user.userId,
        req.body,
        req.user.role
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(this.sanitizeUser(updatedUser));
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

  async getAllUsers(req: AuthRequest, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { users, total } = await this.userService.getAllUsers(page, limit);
      res.json({
        users,
        total,
        page,
        pages: Math.ceil(total / limit)
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req: AuthRequest, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req: AuthRequest, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      await this.userService.deleteUser(req.params.id);
      res.status(204).end();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  private sanitizeUser(user: IUser): Partial<IUser> {
    const { password, __v, refreshToken, ...userData } = user.toObject();
    return userData;
  }
}