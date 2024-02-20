import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Image } from './Image.schema'
import { Color } from './Color.schema'
import { Storage } from './Storage.schema'

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string

  @Prop({ required: true })
  user_id: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }] })
  images: Image[]

  @Prop({
    type: [
      {
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Color'
        },
        storage: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Storage'
        },
        quantity: {
          type: Number
        },
        price: {
          type: Number
        }
      }
    ]
  })
  specs: {
    color: Color
    storage: Storage
    quantity: number
    price: number
  }[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)

ProductSchema.index({ name: 'text' })
