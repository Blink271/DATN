import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate } from 'email-validator';
import { BadRequestError, UnauthorizedError } from '../utils/errors';

export class UserService {
  async register(userData: Partial<IUser>): Promise<IUser> {
    if (!validate(userData.email!)) {
      throw new BadRequestError('Invalid email format');
    }
    if (userData.password!.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters');
    }

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new BadRequestError('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    return await User.create({
      ...userData,
      password: hashedPassword,
      role: userData.role || 'user',
      isActive: true
    });
  }

  async login(email: string, password: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    
    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
  }

  async refreshToken(userId: string, refreshToken: string): Promise<string> {
    const user = await User.findById(userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    return this.generateAccessToken(user);
  }

  private generateAccessToken(user: IUser): string {
    return jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
  }

  private generateRefreshToken(user: IUser): string {
    return jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );
  }

  async getProfile(userId: string): Promise<Partial<IUser> | null> {
    return User.findById(userId).select('-password -__v -refreshToken');
  }

  async updateUser(userId: string, updateData: Partial<IUser>, currentUserRole: string): Promise<IUser | null> {
    if (updateData.role && currentUserRole !== 'admin') {
      throw new BadRequestError('Only admin can change roles');
    }
    if (updateData.email && !validate(updateData.email)) {
      throw new BadRequestError('Invalid email format');
    }
    if (updateData.password && updateData.password.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters');
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    return User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
      .select('-password -__v -refreshToken');
  }

  async deleteUser(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { isActive: false });
  }

  async getAllUsers(page: number = 1, limit: number = 10): Promise<{ users: IUser[], total: number }> {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find({ isActive: true })
        .select('-password -__v -refreshToken')
        .skip(skip)
        .limit(limit),
      User.countDocuments({ isActive: true })
    ]);
    return { users, total };
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId).select('-password -__v -refreshToken');
  }
}