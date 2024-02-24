import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from 'src/schemas/Product.schema'
import { CreateProductDto, QueryProductDto, UpdateProductDto } from './dto'
import { ImageService } from 'src/image/image.service'
import { SortDirection } from 'src/utils/enums'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private imageService: ImageService
  ) {}

  async createProduct(payload: CreateProductDto) {
    try {
      const images = await this.imageService.checkAndCreateImage(payload.images.map((i) => ({ url: i })))

      const createdProduct = new this.productModel({
        name: payload.name,
        description: payload.description,
        user_id: payload.user_id,
        price: payload.price,
        quantity: payload.quantity,
        images
      })

      const newProduct = await createdProduct.save()

      return { data: newProduct }
    } catch (error) {
      return error
    }
  }

  async getProducts(payload: QueryProductDto) {
    try {
      const page = Number(payload.page) || 1
      const limit = Number(payload.limit) || 10

      const sort = payload.sort || 'createdAt'
      const dir = payload.dir || SortDirection.DESC

      const { search, user_id, ids } = payload

      if (page <= 0) throw new BadRequestException('Page must be greater than zero')

      const per_page = (page - 1) * limit

      let filter = {}
      if (search)
        filter = {
          $text: {
            $search: search
          }
        }

      if (user_id) filter['user_id'] = user_id

      // ids = id1,id2

      if (ids) {
        filter['_id'] = {
          $in: ids.split(',')
        }
      }

      console.log(filter)

      const [data, total] = await Promise.all([
        this.productModel
          .find(filter)
          .limit(limit)
          .skip(per_page)
          .sort({
            [sort]: dir
          })
          .populate(['images']),
        this.productModel.aggregate([
          {
            $match: filter
          },
          {
            $count: 'total'
          }
        ])
      ])

      return {
        data: {
          data,
          page,
          limit,
          total: total[0]?.total || 0
        },
        msg: 'Get products successfully'
      }
    } catch (error) {
      return error
    }
  }

  async updateProduct({ id, payload }: { id: string; payload: UpdateProductDto }) {
    try {
      const images = await this.imageService.checkAndCreateImage(payload.images.map((i) => ({ url: i })))

      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        {
          name: payload.name,
          description: payload.description,
          price: payload.price,
          quantity: payload.quantity,
          images
        },
        { new: true }
      )

      return {
        data: updatedProduct
      }
    } catch (error) {
      return error
    }
  }

  async deleteProduct() {}

  async getProductId(id: string) {
    try {
      const product = await this.productModel.findById(id)
      if (!product) throw new NotFoundException('Product not found')
      const data = await product.populate(['images'])

      return {
        data,
        msg: 'Get product by id successfully'
      }
    } catch (error) {
      return error
    }
  }
}
