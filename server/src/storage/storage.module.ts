import { Module } from '@nestjs/common'
import { StorageController } from './storage.controller'
import { StorageService } from './storage.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Storage, StorageSchema } from 'src/schemas/Storage.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Storage.name,
        schema: StorageSchema
      }
    ])
  ],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService]
})
export class StorageModule {}
