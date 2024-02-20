import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Color {
  @Prop({ required: true })
  code: string

  @Prop({ required: true })
  name: string
}

export const ColorSchema = SchemaFactory.createForClass(Color)
