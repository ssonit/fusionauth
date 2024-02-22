import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Product } from './Product.schema'
import { Color } from './Color.schema'
import { Storage } from './Storage.schema'

@Schema({ timestamps: true })
export class Cart {
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
}

export const CartSchema = SchemaFactory.createForClass(Cart)
