import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new UnauthorizedError('No token provided');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = { userId: (decoded as { id: string }).id, role: (decoded as { role: string }).role };
    next();
  } catch {
    throw new UnauthorizedError('Invalid token');
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    throw new UnauthorizedError('Admin access required');
  }
  next();
};