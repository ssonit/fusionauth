import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Product } from './Product.schema'

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  user_id: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  })
  product: Product

  @Prop({ required: true })
  quantity: number
}

export const CartSchema = SchemaFactory.createForClass(Cart)
