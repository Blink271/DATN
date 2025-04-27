import Order, { IOrder } from '../models/Order';

export const createOrder = async (orderData: Partial<IOrder>): Promise<IOrder> => {
  const order = new Order(orderData);
  return await order.save();
};

export const getAllOrders = async (): Promise<IOrder[]> => {
  return await Order.find();
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id);
};
