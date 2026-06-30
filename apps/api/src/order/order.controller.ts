import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Get } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Patch } from '@nestjs/common';
import { CancelOrderItemDto } from './dto/cancel-order-item.dto';


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


@Patch(':id/cancel-item')
cancelOrderItem(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: CancelOrderItemDto,
) {
  
return this.orderService.cancelOrderItem(
    id,
    dto.orderItemId,
    dto.quantity,
    dto.reason
  );

}

}
