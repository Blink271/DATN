import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching all products', error: error.message });
    }
  }

  async getProductsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error: any) {
      res.status(400).json({ message: 'Error fetching products', error: error.message });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.productService.createProduct(req.params.category, req.body);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ message: 'Error creating product', error: error.message });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.productService.updateProduct(req.params.id, req.params.category, req.body);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ message: 'Error updating product', error: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.productService.deleteProduct(req.params.id, req.params.category);
      if (!success) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: 'Error deleting product', error: error.message });
    }
  }
}