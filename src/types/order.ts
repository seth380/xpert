export type Carrier = 'DHL' | 'SPEEDX' | 'USPS' | 'UPS' | 'FEDEX' | 'OTHER';

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'PACKED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItemInput {
  sku: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderInput {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry?: string;
  items: OrderItemInput[];
}
