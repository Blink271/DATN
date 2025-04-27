// import express from 'express';
// import { createOrder, getAllOrders, getOrderById } from '../services/orderService';

// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const order = await createOrder(req.body);
//     res.status(201).json(order);
//   } catch (error) {
//     res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const orders = await getAllOrders();
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
//   }
// });

// router.get('/:id', async (req: express.Request<{ id: string }>, res: express.Response) => {
//   try {
//     const order = await getOrderById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
//   }
// });

// export default router;
