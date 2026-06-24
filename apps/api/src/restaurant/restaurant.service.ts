import { Injectable } from '@nestjs/common'; // ⭐ IMPORTANT: makes this class available for dependency injection

@Injectable() // ⭐ IMPORTANT: marks this class as a service (provider)
export class RestaurantService {

  // ⭐ IMPORTANT: this is in-memory storage (temporary instead of DB)
  private restaurants: any[] = [];

  // ✅ create restaurant
  createRestaurant(name: string) {
    const newRestaurant = {
      id: Date.now(), // simple unique ID for now
      name,
    };

    this.restaurants.push(newRestaurant);

    return newRestaurant;
  }

  // ✅ get all restaurants
  getRestaurants() {
    return this.restaurants;
  }
}