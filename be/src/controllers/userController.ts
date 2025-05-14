//userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password, phone, role } = req.body;
      const result = await this.userService.register({ name, email, password, phone, role });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

  async addUser(req: Request, res: Response) {
    try {
      const { name, email, password, address, phone, role } = req.body;
      const result = await this.userService.addUser({ name, email, password, address, phone, role });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(error.statusCode || 401).json({ message: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, phone, address, role } = req.body;
      const updatedUser = await this.userService.updateUser(id, { name, email, phone, address, role });
      res.json(updatedUser);
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }
}