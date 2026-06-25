import { Controller, Get, Post, Body } from '@nestjs/common';
// ⭐ IMPORTANT: API decorators (convert code → HTTP endpoints)

import { RestaurantService } from './restaurant.service'; 
// ⭐ IMPORTANT: connects controller to business logic

@Controller('restaurant') 
// ⭐ IMPORTANT: Base route → /restaurant
export class RestaurantController {

  // ⭐ IMPORTANT: Dependency Injection
  constructor(private readonly restaurantService: RestaurantService) {}

  // ✅ GET /restaurant
  @Get()
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  // ✅ POST /restaurant
  @Post()
  createRestaurant(@Body('name') name: string) {
    return this.restaurantService.createRestaurant(name);
  }
}