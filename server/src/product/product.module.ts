import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from 'src/schemas/Product.schema'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { ImageModule } from 'src/image/image.module'
import { ColorModule } from 'src/color/color.module'
import { StorageModule } from 'src/storage/storage.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      }
    ]),
    ImageModule,
    ColorModule,
    StorageModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
