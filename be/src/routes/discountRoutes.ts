import express from 'express';
import { createDiscount, getAllDiscounts } from '../services/discountService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const discount = await createDiscount(req.body);
    res.status(201).json(discount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const discounts = await getAllDiscounts();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
