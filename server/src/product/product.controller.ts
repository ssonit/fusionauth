import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto, QueryProductDto, UpdateProductDto } from './dto'

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body)
  }

  @Get()
  getProducts(@Query() query: QueryProductDto) {
    return this.productService.getProducts(query)
  }

  @Put(':id')
  updateProduct(@Body() body: UpdateProductDto, @Param('id') id: string) {
    return this.productService.updateProduct({
      id,
      payload: body
    })
  }
}
