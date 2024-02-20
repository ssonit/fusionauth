import { Injectable } from '@nestjs/common'
import { CreateImageDto } from './dto'
import { InjectModel } from '@nestjs/mongoose'
import { Image } from 'src/schemas/Image.schema'
import { Model } from 'mongoose'

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async checkAndCreateImage(payload: CreateImageDto[]) {
    const images = await Promise.all(
      payload.map((item) => {
        return this.imageModel.findOneAndUpdate(
          {
            url: item.url
          },
          {
            $setOnInsert: new this.imageModel({
              url: item.url
            })
          },
          {
            upsert: true,
            returnDocument: 'after'
          }
        )
      })
    )
    return images
  }
}
