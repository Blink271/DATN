import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { BadRequestError, UnauthorizedError } from '../utils/errors';
import mongoose from 'mongoose';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role?: 'admin' | 'user';
}

interface UpdateData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: 'admin' | 'user';
}

export class UserService {
  async register(data: RegisterData): Promise<{ user: Partial<IUser>, accessToken: string }> {
    // Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new BadRequestError('Invalid email format');
    }
    if (data.password.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters');
    }
    if (!/^\d{10}$/.test(data.phone)) {
      throw new BadRequestError('Phone number must be 10 digits');
    }
    if (!data.name.trim() || data.name.length < 2) {
      throw new BadRequestError('Name must be at least 2 characters');
    }
    if (data.address && data.address.length > 200) {
      throw new BadRequestError('Address must be less than 200 characters');
    }

    // Check existing email
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new BadRequestError('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      address: data.address || '',
      role: data.role || 'user',
      created_at: new Date()
    });

    // Generate JWT
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Remove password from response
    const { password: pwd, ...userData } = user.toObject();
    return { user: userData, accessToken };
  }

  async addUser(data: RegisterData): Promise<{ user: Partial<IUser>, accessToken: string }> {
    // Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new BadRequestError('Invalid email format');
    }
    if (data.password.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters');
    }
    if (!/^\d{10}$/.test(data.phone)) {
      throw new BadRequestError('Phone number must be 10 digits');
    }
    if (!data.name.trim() || data.name.length < 2) {
      throw new BadRequestError('Name must be at least 2 characters');
    }
    if (data.address && data.address.length > 200) {
      throw new BadRequestError('Address must be less than 200 characters');
    }

    // Check existing email
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new BadRequestError('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      address: data.address || '',
      role: data.role || 'user',
      created_at: new Date()
    });

    // Generate JWT
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Remove password from response
    const { password: pwd, ...userData } = user.toObject();
    return { user: userData, accessToken };
  }

  async login(email: string, password: string): Promise<{ user: Partial<IUser>, accessToken: string }> {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate JWT
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Remove password from response
    const { password: pwd, ...userData } = user.toObject();
    return { user: userData, accessToken };
  }

  async getAllUsers(): Promise<Partial<IUser>[]> {
    const users = await User.find().select('-password');
    return users.map(user => user.toObject());
  }

  async getUserById(id: string): Promise<Partial<IUser>> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('Invalid user ID');
    }
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new BadRequestError('User not found');
    }
    return user.toObject();
  }

  async updateUser(id: string, data: UpdateData): Promise<Partial<IUser>> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('Invalid user ID');
    }

    // Validation
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new BadRequestError('Invalid email format');
    }
    if (data.phone && !/^\d{10}$/.test(data.phone)) {
      throw new BadRequestError('Phone number must be 10 digits');
    }
    if (data.name && (!data.name.trim() || data.name.length < 2)) {
      throw new BadRequestError('Name must be at least 2 characters');
    }
    if (data.address && data.address.length > 200) {
      throw new BadRequestError('Address must be less than 200 characters');
    }
    if (data.role && !['admin', 'user'].includes(data.role)) {
      throw new BadRequestError('Invalid role');
    }

    // Check existing email (if updated)
    if (data.email) {
      const existingUser = await User.findOne({ email: data.email, _id: { $ne: id } });
      if (existingUser) {
        throw new BadRequestError('Email already exists');
      }
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new BadRequestError('User not found');
    }

    return user.toObject();
  }

  async deleteUser(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('Invalid user ID');
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new BadRequestError('User not found');
    }
  }
}