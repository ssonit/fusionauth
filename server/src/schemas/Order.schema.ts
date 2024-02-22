import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Color } from './Color.schema'
import { Storage } from './Storage.schema'
import { PaymentType } from 'src/utils/enums'
import { Product } from './Product.schema'

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  user_id: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  })
  product: Product

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color'
  })
  color: Color

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Storage'
  })
  storage: Storage

  @Prop({ required: true })
  quantity: number

  @Prop({
    required: true,
    default: false
  })
  isPaid: boolean

  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  address: string

  @Prop()
  notes: string

  @Prop({ required: true, enum: Object.values(PaymentType).filter((value) => typeof value === 'number') })
  payment_type: number
}

export const OrderSchema = SchemaFactory.createForClass(Order)
