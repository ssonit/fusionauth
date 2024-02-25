import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Cart } from 'src/schemas/Cart.schema'
import { CreateCartDto, QueryCartDto } from './dto'
import { SortDirection } from 'src/utils/enums'

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async createProductCart(payload: CreateCartDto) {
    try {
      const { user_id, product, quantity } = payload
      const createdCart = new this.cartModel({
        user_id,
        product,
        quantity
      })

      const newCart = await createdCart.save()
      return {
        data: newCart,
        msg: 'Create product cart successfully'
      }
    } catch (error) {
      return error
    }
  }

  async getCartByUserId(payload: QueryCartDto) {
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
        this.cartModel.aggregate([
          {
            $match: filter
          },
          {
            $lookup: {
              from: 'products',
              localField: 'product',
              foreignField: '_id',
              as: 'product'
            }
          },
          {
            $unwind: '$product'
          },
          {
            $lookup: {
              from: 'images',
              localField: 'product.images',
              foreignField: '_id',
              as: 'product.images'
            }
          },
          {
            $limit: limit
          },
          {
            $skip: per_page
          },
          {
            $sort: {
              [sort]: dir === SortDirection.ASC ? 1 : -1
            }
          }
        ]),
        this.cartModel.aggregate([
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
        msg: 'Get products cart successfully'
      }
    } catch (error) {
      return error
    }
  }

  async deleteProductCart(id: string) {
    try {
      const result = await this.cartModel.findByIdAndDelete(id)

      if (!result) throw new NotFoundException('Not found id')

      return {
        msg: 'Delete Product Cart Success'
      }
    } catch (error) {
      return error
    }
  }
}
