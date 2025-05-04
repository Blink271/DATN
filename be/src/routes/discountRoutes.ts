import express from 'express';
import { createDiscount, getAllDiscounts } from '../services/discountService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const discount = await createDiscount(req.body);
    res.status(201).json(discount);
  } catch {
    res.status(400).json({  });
  }
});

router.get('/', async (req, res) => {
  try {
    const discounts = await getAllDiscounts();
    res.status(200).json(discounts);
  } catch {
    res.status(500).json({ error: 'Error fetching discounts' });
  }
});

export default router;
