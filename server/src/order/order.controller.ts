import { Body, Controller, Post } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderManyDto } from './dto'

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/create-many')
  createOrderMany(@Body() body: CreateOrderManyDto) {
    return this.orderService.createOrderMany(body)
  }
}
