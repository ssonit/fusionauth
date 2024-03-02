import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ required: true })
  user_id: string

  @Prop({ required: true, default: 0 })
  balance: number

  @Prop({ required: true, default: 'VND' })
  currency: string
}

export const WalletSchema = SchemaFactory.createForClass(Wallet)
