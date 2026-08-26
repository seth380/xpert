import { Router } from 'express';
import { getOrder, getOrders, postOrder } from '../controllers/orders.controller';

export const ordersRouter = Router();

ordersRouter.get('/', getOrders);
ordersRouter.get('/:id', getOrder);
ordersRouter.post('/', postOrder);
