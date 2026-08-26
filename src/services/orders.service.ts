import { getPrisma } from '../db/prisma';
import type { CreateOrderInput } from '../types/order';

export class ValidationError extends Error {}

/**
 * Validates a create-order payload. Pure function — no I/O — so it's
 * unit-testable without a database connection.
 */
export function validateCreateOrderInput(input: Partial<CreateOrderInput>): CreateOrderInput {
  if (!input.orderNumber || typeof input.orderNumber !== 'string') {
    throw new ValidationError('orderNumber is required');
  }
  if (!input.customerName || typeof input.customerName !== 'string') {
    throw new ValidationError('customerName is required');
  }
  if (!input.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.customerEmail)) {
    throw new ValidationError('a valid customerEmail is required');
  }
  if (!input.shippingAddress || !input.shippingCity || !input.shippingState || !input.shippingZip) {
    throw new ValidationError('shippingAddress, shippingCity, shippingState, and shippingZip are required');
  }
  if (!Array.isArray(input.items) || input.items.length === 0) {
    throw new ValidationError('at least one order item is required');
  }
  for (const item of input.items) {
    if (!item.sku || !item.description || !(item.quantity > 0) || !(item.unitPrice >= 0)) {
      throw new ValidationError('each item requires sku, description, quantity > 0, and unitPrice >= 0');
    }
  }

  return {
    orderNumber: input.orderNumber,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    shippingAddress: input.shippingAddress,
    shippingCity: input.shippingCity,
    shippingState: input.shippingState,
    shippingZip: input.shippingZip,
    shippingCountry: input.shippingCountry ?? 'US',
    items: input.items,
  };
}

export async function listOrders() {
  return getPrisma().order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getOrderById(id: string) {
  return getPrisma().order.findUnique({
    where: { id },
    include: { items: true },
  });
}

export async function createOrder(input: CreateOrderInput) {
  const validated = validateCreateOrderInput(input);
  return getPrisma().order.create({
    data: {
      orderNumber: validated.orderNumber,
      customerName: validated.customerName,
      customerEmail: validated.customerEmail,
      shippingAddress: validated.shippingAddress,
      shippingCity: validated.shippingCity,
      shippingState: validated.shippingState,
      shippingZip: validated.shippingZip,
      shippingCountry: validated.shippingCountry ?? 'US',
      items: {
        create: validated.items.map((item) => ({
          sku: item.sku,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    },
    include: { items: true },
  });
}
