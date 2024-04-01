import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Order } from 'src/schemas/Order.schema'
import { CreateOrderManyDto, QueryOrderDto } from './dto'
import { SortDirection } from 'src/utils/enums'

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrderMany(payload: CreateOrderManyDto) {
    try {
      const { user_id, username, phone, address, notes, payment_type, product_order } = payload

      const created_orders = product_order.map((item) => {
        const order = new this.orderModel({
          user_id,
          username,
          address,
          phone,
          notes,
          payment_type,
          product: item.product_id,
          quantity: item.quantity
        })
        return order
      })

      const data = await this.orderModel.insertMany(created_orders)

      return { data, msg: 'Create many order successfully' }
    } catch (error) {
      return error
    }
  }

  async getOrders(payload: QueryOrderDto) {
    try {
      const page = Number(payload.page) || 1
      const limit = Number(payload.limit) || 10

      const sort = payload.sort || 'createdAt'
      const dir = payload.dir || SortDirection.DESC

      const { search, user_id, ids } = payload

      if (page <= 0) throw new BadRequestException('Page must be greater than zero')

      const per_page = (page - 1) * limit

      let filter = {}
      if (search) {
        filter = {
          $text: {
            $search: search
          }
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
        this.orderModel
          .find(filter)
          .limit(limit)
          .skip(per_page)
          .sort({
            [sort]: dir
          }),
        this.orderModel.aggregate([
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
}
