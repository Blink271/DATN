import User from '../models/User';

export const getUserService = async (userId: string) => {
  return await User.findById(userId);
};

export const createUserService = async (userData: any) => {
  const user = new User(userData);
  return await user.save();
};