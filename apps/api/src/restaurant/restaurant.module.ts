import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller'; // ⭐ IMPORTANT
import { RestaurantService } from './restaurant.service';       // ⭐ IMPORTANT

@Module({
  imports: [],
  controllers: [RestaurantController], // ⭐ REGISTER CONTROLLER
  providers: [RestaurantService],      // ⭐ REGISTER SERVICE
})
export class RestaurantModule {}
