import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { UnitStorage } from 'src/utils/enums'

@Schema({ timestamps: true })
export class Storage {
  @Prop({ lowercase: true, required: true })
  code: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true, enum: Object.values(UnitStorage).filter((value) => typeof value === 'number') })
  unit: number
}

export const StorageSchema = SchemaFactory.createForClass(Storage)
