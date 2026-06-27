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
  cancelledAt?: string;
}


@Injectable()


export class OrderService {
  

  

  constructor(private readonly menuService: MenuService) {}

  private orders: any[] = [];   // ⭐ STORE ORDERS

  createOrder(itemIds: number[]) {

  const allMenuItems = this.menuService.getMenuItems();

  const selectedItems: OrderItem[] = [];

  let total = 0;

  for (const id of itemIds) {

    const item = allMenuItems.find(i => i.id === id);

    if (!item) {
      throw new NotFoundException(`Menu item with id ${id} not found`);
    }

    const orderItem: OrderItem = {
      orderItemId: Date.now() + Math.random(), // simple unique id
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      kitchenArea: item.kitchenArea,
      quantity: 1,

      status: 'ACTIVE',  // ⭐ IMPORTANT

      createdAt: new Date().toISOString(),
    };

    selectedItems.push(orderItem);

    total += item.price;
  }

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
}