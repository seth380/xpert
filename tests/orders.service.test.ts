import { describe, expect, it } from 'vitest';
import { validateCreateOrderInput, ValidationError } from '../src/services/orders.service';

const validInput = {
  orderNumber: 'ORD-1001',
  customerName: 'Jane Doe',
  customerEmail: 'jane@example.com',
  shippingAddress: '123 Main St',
  shippingCity: 'Springfield',
  shippingState: 'IL',
  shippingZip: '62701',
  items: [{ sku: 'SKU-1', description: 'Widget', quantity: 2, unitPrice: 9.99 }],
};

describe('validateCreateOrderInput', () => {
  it('accepts a well-formed order', () => {
    expect(() => validateCreateOrderInput(validInput)).not.toThrow();
  });

  it('rejects a missing orderNumber', () => {
    const { orderNumber: _omit, ...rest } = validInput;
    expect(() => validateCreateOrderInput(rest)).toThrow(ValidationError);
  });

  it('rejects an invalid email', () => {
    expect(() =>
      validateCreateOrderInput({ ...validInput, customerEmail: 'not-an-email' }),
    ).toThrow(ValidationError);
  });

  it('rejects an order with no items', () => {
    expect(() => validateCreateOrderInput({ ...validInput, items: [] })).toThrow(ValidationError);
  });

  it('rejects an item with zero quantity', () => {
    expect(() =>
      validateCreateOrderInput({
        ...validInput,
        items: [{ sku: 'SKU-1', description: 'Widget', quantity: 0, unitPrice: 9.99 }],
      }),
    ).toThrow(ValidationError);
  });
});
