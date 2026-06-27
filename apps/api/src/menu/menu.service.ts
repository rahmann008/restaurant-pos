import { Injectable } from '@nestjs/common';
// ⭐ IMPORTANT: marks this as service (logic layer)
import { NotFoundException } from '@nestjs/common'; // ⭐ IMPORTANT

// ⭐ IMPORTANT: define menu item structure
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  kitchenArea: string;
}

@Injectable()
export class MenuService {

  // ⭐ IMPORTANT: temporary in-memory storage
  private menuItems: MenuItem[] = [];

  // ✅ create menu item
  createMenuItem(name: string, price: number, kitchenArea: string): MenuItem {

    const newItem: MenuItem = {
      id: Date.now(),
      name,
      price,
      kitchenArea,
    };

    this.menuItems.push(newItem);

    return newItem;
  }

  // ✅ get all menu items
  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }

  
// ✅ update menu item
updateMenuItem(
  id: number,
  name?: string,
  price?: number,
  kitchenArea?: string
) {
  const item = this.menuItems.find(i => i.id === id);

  if (!item) {
    throw new NotFoundException(`Menu item with id ${id} not found`);
  }

  // ⭐ IMPORTANT: update only if value provided
  if (name !== undefined) item.name = name;
  if (price !== undefined) item.price = price;
  if (kitchenArea !== undefined) item.kitchenArea = kitchenArea;

  return item;
}

// ✅ delete menu item
deleteMenuItem(id: number) {

  const index = this.menuItems.findIndex(i => i.id === id);

  if (index === -1) {
    throw new NotFoundException(`Menu item with id ${id} not found`);
  }

  const deletedItem = this.menuItems.splice(index, 1)[0];

  return {
    message: 'Menu item deleted successfully',
    deletedItem
  };
}
}