import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Storage } from 'src/schemas/Storage.schema'
import { CreateStorageDto } from './dto'

@Injectable()
export class StorageService {
  constructor(@InjectModel(Storage.name) private storageModel: Model<Storage>) {}

  async upsertMultiStorage(payload: CreateStorageDto[]) {
    const data = await Promise.all(
      payload.map((item) => {
        return this.storageModel.findOneAndUpdate(
          {
            name: item.name
          },
          {
            $setOnInsert: new this.storageModel({
              name: item.name,
              code: item.name.toLowerCase(),
              unit: item.unit
            })
          },
          {
            upsert: true,
            returnDocument: 'after'
          }
        )
      })
    )
    return data
  }
}
