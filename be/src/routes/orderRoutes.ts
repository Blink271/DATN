import * as express from 'express';
import { OrderController } from '../controllers/orderController';
import { asyncHandler, BadRequestError } from '../utils/errors';

const router = express.Router();
const orderController = new OrderController();

router.post(
  '/',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    await orderController.createOrder(req, res);
  })
);

router.get(
  '/',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    await orderController.getAllOrders(req, res);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    await orderController.getOrderById(req, res);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { status } = req.body;
    if (!status || !['pending', 'completed', 'canceled'].includes(status)) {
      throw new BadRequestError('Invalid status');
    }
    await orderController.updateOrderStatus(req, res);
  })
);



export default router;