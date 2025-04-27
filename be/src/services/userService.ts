import User, { IUser } from '../models/User';

export class UserService {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    return await User.create(userData);
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

  async getAllUsers(): Promise<IUser[]> {
    return await User.find(); // New method to fetch all users
  }
}