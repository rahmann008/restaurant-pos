import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Get } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

import { Param, ParseIntPipe } from '@nestjs/common';



@Controller('order')
// ⭐ base route → /order
export class OrderController {

  constructor(private readonly orderService: OrderService) {}


@Post()
createOrder(@Body() dto: CreateOrderDto) {
  return this.orderService.createOrder(dto.itemIds);
}


  @Get()
  getOrders() {
  return this.orderService.getOrders();
}

  
@Get(':id')
getOrderById(
  @Param('id', ParseIntPipe) id: number
) {
  return this.orderService.getOrderById(id);
}



}
