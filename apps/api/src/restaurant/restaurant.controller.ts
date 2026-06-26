import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
// ⭐ IMPORTANT:
// Body          → reads request body
// Controller    → defines API route group
// Delete        → handles DELETE request
// Get           → handles GET request
// Param         → reads URL parameter
// ParseIntPipe  → converts URL id from string to number
// Post          → handles POST request
// Put           → handles PUT request

import { RestaurantService } from './restaurant.service';
// ⭐ IMPORTANT: connects controller to business logic

import { CreateRestaurantDto } from './dto/create-restaurant.dto';
// ⭐ IMPORTANT: validates request body for create/update restaurant

@Controller('restaurant')
// ⭐ IMPORTANT: Base route is /restaurant
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  // ⭐ IMPORTANT:
  // Dependency Injection.
  // NestJS automatically provides RestaurantService here.

  @Get()
  // ✅ GET /restaurant
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  @Post()
  // ✅ POST /restaurant
  createRestaurant(@Body() dto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(dto.name);
  }

  @Put(':id')
  // ✅ PUT /restaurant/:id
  updateRestaurant(
    @Param('id', ParseIntPipe) id: number,
    // ⭐ IMPORTANT:
    // Reads id from URL and converts it from string to number

    @Body() dto: CreateRestaurantDto,
    // ⭐ IMPORTANT:
    // Reuses validation rules:
    // name must exist, must be string, and cannot be empty
  ) {
    return this.restaurantService.updateRestaurant(id, dto.name);
  }

  @Delete(':id')
  // ✅ DELETE /restaurant/:id
  deleteRestaurant(
    @Param('id', ParseIntPipe) id: number,
    // ⭐ IMPORTANT:
    // Reads id from URL and converts it from string to number
  ) {
    return this.restaurantService.deleteRestaurant(id);
  }
}