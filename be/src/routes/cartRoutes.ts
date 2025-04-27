import express from 'express';
import { createCart, getCartByUserId } from '../services/cartService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const cart = await createCart(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const cart = await getCartByUserId(req.params.userId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
