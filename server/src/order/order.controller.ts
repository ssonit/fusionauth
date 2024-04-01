import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderManyDto, QueryOrderDto } from './dto'

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/create-many')
  createOrderMany(@Body() body: CreateOrderManyDto) {
    return this.orderService.createOrderMany(body)
  }

  @Get('')
  async getOrders(@Query() query: QueryOrderDto) {
    try {
      const data = await this.orderService.getOrders(query)

      return {
        data,
        msg: 'Get orders successfully'
      }
    } catch (error) {
      return error
    }
  }
}
