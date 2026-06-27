import { Module } from '@nestjs/common';
// ⭐ module decorator for NestJS
import { OrderController } from './order.controller'; // ⭐
import { OrderService } from './order.service'; // ⭐
import { MenuModule } from '../menu/menu.module'; // ⭐


@Module({
 
  imports: [MenuModule], // ⭐ IMPORTANT (dependency)
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController],

})
export class OrderModule {}
