import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from 'src/schemas/Product.schema'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { ImageModule } from 'src/image/image.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      }
    ]),
    ImageModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
