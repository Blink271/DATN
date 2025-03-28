import { Request, Response } from 'express';
import { getUserService, createUserService } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await getUserService(userId);
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await createUserService(userData);
  res.status(201).json(newUser);
};