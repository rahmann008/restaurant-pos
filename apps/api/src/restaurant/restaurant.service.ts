import { Injectable, NotFoundException } from '@nestjs/common';
// ⭐ IMPORTANT: NotFoundException is used to return 404 error when restaurant is not found

export interface Restaurant {
  id: number;
  name: string;
}
// ⭐ IMPORTANT: This gives proper type safety instead of using any[]

@Injectable()
// ⭐ IMPORTANT: Marks this class as a NestJS service/provider
export class RestaurantService {
  private restaurants: Restaurant[] = [];
  // ⭐ IMPORTANT: Temporary in-memory storage until we connect PostgreSQL/Supabase

  createRestaurant(name: string): Restaurant {
    const newRestaurant: Restaurant = {
      id: Date.now(),
      name,
    };

    this.restaurants.push(newRestaurant);

    return newRestaurant;
  }

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  updateRestaurant(id: number, name: string): Restaurant {
    // ⭐ IMPORTANT: Find restaurant by id
    const restaurant = this.restaurants.find((item) => item.id === id);

    // ⭐ IMPORTANT: If restaurant does not exist, return 404
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }

    // ⭐ IMPORTANT: Update the restaurant name
    restaurant.name = name;

    return restaurant;
  }
  deleteRestaurant(id: number) {
  // ⭐ IMPORTANT: Find the index of the restaurant by id
  const restaurantIndex = this.restaurants.findIndex((item) => item.id === id);

  // ⭐ IMPORTANT: If index is -1, restaurant does not exist
  if (restaurantIndex === -1) {
    throw new NotFoundException(`Restaurant with id ${id} not found`);
  }

  // ⭐ IMPORTANT: Remove the restaurant from the array
  const deletedRestaurant = this.restaurants.splice(restaurantIndex, 1)[0];

  return {
    message: 'Restaurant deleted successfully',
    deletedRestaurant,
  };
}
}
