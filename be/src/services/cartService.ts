import Cart, { ICart } from '../models/Cart';

export const createCart = async (cartData: Partial<ICart>): Promise<ICart> => {
  const cart = new Cart(cartData);
  return await cart.save();
};

export const getCartByUserId = async (userId: string): Promise<ICart | null> => {
  return await Cart.findOne({ user_id: userId }).populate('user_id');
};
