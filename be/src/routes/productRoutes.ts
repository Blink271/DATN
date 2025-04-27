import express from 'express';
import { ProductController } from '../controllers/productController';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();
const productController = new ProductController();

router.get('/', asyncHandler(productController.getAllProducts.bind(productController)));
router.get('/:category', asyncHandler(productController.getProductsByCategory.bind(productController)));
router.post('/:category', asyncHandler(productController.createProduct.bind(productController)));
router.put('/:category/:id', asyncHandler(productController.updateProduct.bind(productController)));
router.delete('/:category/:id', asyncHandler(productController.deleteProduct.bind(productController)));

export default router;