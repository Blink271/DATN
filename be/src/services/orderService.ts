import mongoose from 'mongoose';
import Order, { IOrder } from '../models/Order';
import User from '../models/User';
import { Product } from '../models/Product';
import { BadRequestError, NotFoundError } from '../utils/errors';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderData {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  name: string;
  phone: string;
  address: string;
  notes?: string;
  requireInvoice: boolean;
  discountCode?: string;
}


export class OrderService {
  async createOrder(data: OrderData): Promise<IOrder> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Validate user
      if (!mongoose.Types.ObjectId.isValid(data.userId)) {
        throw new BadRequestError('Invalid user ID');
      }
      const user = await User.findById(data.userId).session(session);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Validate items
      if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
        throw new BadRequestError('Order must contain at least one item');
      }

      let calculatedTotal = data.shippingFee;
      for (const item of data.items) {
        if (!mongoose.Types.ObjectId.isValid(item.productId)) {
          throw new BadRequestError(`Invalid product ID: ${item.productId}`);
        }
        const product = await Product.findById(item.productId).session(session);
        if (!product) {
          throw new NotFoundError(`Product not found: ${item.productId}`);
        }
        if (item.quantity < 1) {
          throw new BadRequestError(`Quantity must be at least 1 for product: ${item.name}`);
        }
        if (item.quantity > product.stock) {
          throw new BadRequestError(`Insufficient stock for product: ${item.name}`);
        }
        if (item.price !== product.price) {
          throw new BadRequestError(`Price mismatch for product: ${item.name}`);
        }
        calculatedTotal += item.price * item.quantity;

        // Update stock and sold_count
        product.stock -= item.quantity;
        product.sold_count += item.quantity;
        await product.save({ session });
      }

      // Validate totalAmount
      if (data.totalAmount !== calculatedTotal) {
        throw new BadRequestError('Total amount mismatch');
      }

      // Validate shipping details
      if (!data.name || data.name.trim().length < 2) {
        throw new BadRequestError('Name must be at least 2 characters');
      }
      if (!data.phone || !/^\d{10}$/.test(data.phone)) {
        throw new BadRequestError('Phone number must be 10 digits');
      }
      if (!data.address || data.address.trim().length < 5) {
        throw new BadRequestError('Address must be at least 5 characters');
      }
      if (data.notes && data.notes.length > 500) {
        throw new BadRequestError('Notes must be less than 500 characters');
      }
      if (data.discountCode && data.discountCode.length > 50) {
        throw new BadRequestError('Discount code must be less than 50 characters');
      }

      // Create order
      const order = new Order({
        userId: data.userId,
        items: data.items,
        totalAmount: data.totalAmount,
        shippingFee: data.shippingFee,
        name: data.name,
        phone: data.phone,
        address: data.address,
        notes: data.notes,
        requireInvoice: data.requireInvoice,
        discountCode: data.discountCode,
        status: 'pending',
        created_at: new Date()
      });

      await order.save({ session });
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getAllOrders(): Promise<IOrder[]> {
    return await Order.find().populate('userId', 'name email').populate('items.productId', 'name price');
  }

  async getOrderById(id: string): Promise<IOrder> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('Invalid order ID');
    }
    const order = await Order.findById(id).populate('userId', 'name email').populate('items.productId', 'name price');
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    return order;
  }

  async updateOrderStatus(id: string, status: 'pending' | 'completed' | 'canceled'): Promise<IOrder> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('Invalid order ID');
    }
    const order = await Order.findById(id);
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    order.status = status;
    await order.save();
    return order;
  }
  
}