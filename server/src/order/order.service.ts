import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Order } from 'src/schemas/Order.schema'
import { CreateOrderManyDto } from './dto'

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
          color: item.color_id,
          storage: item.storage_id,
          quantity: item.quantity
        })
        return order
      })

      const data = await this.orderModel.insertMany(created_orders)

      return { data }
    } catch (error) {
      return error
    }
  }
}
