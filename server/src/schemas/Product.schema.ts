import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Image } from './Image.schema'

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string

  @Prop({ type: Number, required: true })
  price: number

  @Prop({ type: Number, required: true })
  quantity: number

  @Prop({ required: true })
  user_id: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }] })
  images: Image[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
