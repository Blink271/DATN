import Discount, { IDiscount } from '../models/Discount';

export const createDiscount = async (discountData: Partial<IDiscount>): Promise<IDiscount> => {
  const discount = new Discount(discountData);
  return await discount.save();
};

export const getAllDiscounts = async (): Promise<IDiscount[]> => {
  return await Discount.find();
};
