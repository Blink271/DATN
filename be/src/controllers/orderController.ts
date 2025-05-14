// orderController.ts
import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(req: Request, res: Response) {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      res.json(order);
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

  async updateOrderStatus(req: Request, res: Response) {
    try {
      const order = await this.orderService.updateOrderStatus(req.params.id, req.body.status);
      res.json(order);
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  }

}