import { Injectable } from '@nestjs/common'
import { CreateColorDto } from './dto'
import { Color } from 'src/schemas/Color.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ColorService {
  constructor(@InjectModel(Color.name) private colorModel: Model<Color>) {}

  async checkAndCreateColor(payload: CreateColorDto[]) {
    const colors = await Promise.all(
      payload.map((color) => {
        return this.colorModel.findOneAndUpdate(
          {
            name: color.name
          },
          {
            $setOnInsert: new this.colorModel({
              name: color.name
            })
          },
          {
            upsert: true,
            returnDocument: 'after'
          }
        )
      })
    )
    return colors
  }

  async createColor(payload: CreateColorDto) {
    return payload
  }
}
