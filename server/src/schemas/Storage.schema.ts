import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Storage {
  @Prop({ lowercase: true, required: true })
  code: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true, enum: ['GB', 'TB'] })
  unit: string
}

export const StorageSchema = SchemaFactory.createForClass(Storage)
