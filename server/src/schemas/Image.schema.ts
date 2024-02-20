import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Image {
  @Prop({ required: true })
  url: string
}

export const ImageSchema = SchemaFactory.createForClass(Image)
