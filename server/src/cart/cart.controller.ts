import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CartService } from './cart.service'
import { CreateCartDto, QueryCartDto } from './dto'

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('create')
  createCart(@Body() body: CreateCartDto) {
    return this.cartService.createCart(body)
  }

  @Get('')
  getCartByUserId(@Query() query: QueryCartDto) {
    return this.cartService.getCartByUserId(query)
  }
}
