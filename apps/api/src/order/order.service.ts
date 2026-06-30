import { Injectable, NotFoundException } from '@nestjs/common';
import { MenuService, MenuItem } from '../menu/menu.service';


export interface OrderItem {
  orderItemId: number;   // ⭐ unique per item
  menuItemId: number;
  name: string;
  price: number;
  kitchenArea: string;
  quantity: number;

  status: 'ACTIVE' | 'CANCELLED'; // ⭐ IMPORTANT

  createdAt: string;
  cancelReason?: string;
  cancelledAt?: string;
}


@Injectable()


export class OrderService {
  

  

  constructor(private readonly menuService: MenuService) {}

  private orders: any[] = [];   // ⭐ STORE ORDERS

  createOrder(itemIds: number[]) {

  const allMenuItems = this.menuService.getMenuItems();

  const itemMap = new Map<number, OrderItem>();

  for (const id of itemIds) {

    const item = allMenuItems.find(i => i.id === id);

    if (!item) {
      throw new NotFoundException(`Menu item with id ${id} not found`);
    }

    // ✅ if already exists → increase quantity
    if (itemMap.has(id)) {
      const existing = itemMap.get(id)!;
      existing.quantity += 1;
    } else {

      const orderItem: OrderItem = {
        orderItemId: Date.now() + Math.random(),
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        kitchenArea: item.kitchenArea,
        quantity: 1,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      };

      itemMap.set(id, orderItem);
    }
  }

  const selectedItems = Array.from(itemMap.values());

  const total = this.calculateTotal(selectedItems);

  const order = {
    orderId: Date.now(),
    items: selectedItems,
    totalAmount: total,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  this.orders.push(order);

  return order;
}

// ✅ GET all orders
getOrders() {
  return this.orders;
}

// ✅ GET order by ID
getOrderById(id: number) {

  const order = this.orders.find(o => o.orderId === id);

  if (!order) {
    throw new NotFoundException(`Order with id ${id} not found`);
  }

  return order;
}
calculateTotal(items: OrderItem[]) {
  return items
    .filter(item => item.status === 'ACTIVE')
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

cancelOrderItem(
  orderId: number,
  orderItemId: number,
  quantity?: number,
  reason?: string,
) {
  const order = this.orders.find(o => o.orderId === orderId);

  if (!order) {
    throw new NotFoundException(`Order with id ${orderId} not found`);
  }

  const item = order.items.find(
    (i: OrderItem) => i.orderItemId === orderItemId && i.status === 'ACTIVE',
  );

  if (!item) {
    throw new NotFoundException(`Active order item with id ${orderItemId} not found`);
  }

  const cancelQuantity = quantity ?? item.quantity;

  if (cancelQuantity > item.quantity) {
    throw new NotFoundException(
      `Cannot cancel ${cancelQuantity}. Only ${item.quantity} available`,
    );
  }

  if (cancelQuantity === item.quantity) {
  // FULL CANCEL
  item.status = 'CANCELLED';
  item.cancelledAt = new Date().toISOString();
  item.cancelReason = reason;

} else {
  // PARTIAL CANCEL

  item.quantity -= cancelQuantity;

  const cancelledItem: OrderItem = {
    orderItemId: Date.now() + Math.random(),
    menuItemId: item.menuItemId,
    name: item.name,
    price: item.price,
    kitchenArea: item.kitchenArea,
    quantity: cancelQuantity,
    status: 'CANCELLED',
    createdAt: item.createdAt,
    cancelledAt: new Date().toISOString(),
    cancelReason: reason,
  };

  order.items.push(cancelledItem);
}


  order.totalAmount = this.calculateTotal(order.items);
  order.updatedAt = new Date().toISOString();

  return {
    message: 'Order item cancelled successfully',
    order,
    kitchenUpdate: {
      action: 'CANCEL_ITEM',
      itemName: item.name,
      quantity: cancelQuantity,
      kitchenArea: item.kitchenArea,
      reason: reason ?? null,
    },
  };
}
}