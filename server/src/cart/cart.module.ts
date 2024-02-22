import { Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Cart, CartSchema } from 'src/schemas/Cart.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema
      }
    ])
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
