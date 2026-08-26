import type { Request, Response, NextFunction } from 'express';
import { createOrder, getOrderById, listOrders, ValidationError } from '../services/orders.service';

export async function getOrders(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const orders = await listOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'order not found' });
      return;
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function postOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ error: err.message });
      return;
    }
    next(err);
  }
}
