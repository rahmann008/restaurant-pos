import { Body, Controller, Get, Post } from '@nestjs/common';
// ⭐ IMPORTANT: API decorators

import { MenuService } from './menu.service';
// ⭐ IMPORTANT: connect controller → service

import { CreateMenuDto } from './dto/create-menu.dto'; // ⭐ IMPORTANT
import { UpdateMenuDto } from './dto/update-menu.dto'; // ⭐ IMPORTANT

import { Put, Delete, Param, ParseIntPipe } from '@nestjs/common'; // ⭐ IMPORTANT

@Controller('menu')
// ⭐ IMPORTANT: base route → /menu
export class MenuController {

  constructor(private readonly menuService: MenuService) {}
  // ⭐ IMPORTANT: dependency injection

  @Get()
  // ✅ GET /menu
  getMenuItems() {
    return this.menuService.getMenuItems();
  }

  
@Post()
createMenuItem(@Body() dto: CreateMenuDto) {
  return this.menuService.createMenuItem(
    dto.name,
    dto.price,
    dto.kitchenArea
  );
}


@Put(':id')
updateMenuItem(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateMenuDto
) {
  return this.menuService.updateMenuItem(
    id,
    dto.name,
    dto.price,
    dto.kitchenArea
  );
}


 
@Delete(':id')
deleteMenuItem(
  @Param('id', ParseIntPipe) id: number
) {
  return this.menuService.deleteMenuItem(id);
}


}