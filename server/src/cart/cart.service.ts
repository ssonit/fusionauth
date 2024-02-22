import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Cart } from 'src/schemas/Cart.schema'
import { CreateCartDto, QueryCartDto } from './dto'
import { SortDirection } from 'src/utils/enums'

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async createCart(payload: CreateCartDto) {
    try {
      const { user_id, product, color, storage, quantity } = payload
      const createdCart = new this.cartModel({
        user_id,
        product,
        color,
        storage,
        quantity
      })

      const newCart = await createdCart.save()
      return {
        data: newCart
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

      const [data, total] = await Promise.all([
        this.cartModel.aggregate([
          {
            $match: filter
          },
          {
            $limit: limit
          },
          {
            $skip: per_page
          },
          {
            $lookup: {
              from: 'colors',
              localField: 'color',
              foreignField: '_id',
              as: 'color'
            }
          },
          {
            $unwind: {
              path: '$color'
            }
          },
          {
            $lookup: {
              from: 'storages',
              localField: 'storage',
              foreignField: '_id',
              as: 'storage'
            }
          },
          {
            $unwind: {
              path: '$storage'
            }
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
            $unwind: {
              path: '$product'
            }
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
        data,
        page,
        limit,
        total: total[0]?.total || 0
      }
    } catch (error) {
      return error
    }
  }

  async deleteProductCart(product_id: string) {
    try {
      const result = await this.cartModel.findOneAndDelete({
        product: product_id
      })

      if (!result) throw new NotFoundException('Not found product')

      return {
        message: 'Delete Product Cart Success'
      }
    } catch (error) {
      return error
    }
  }
}
