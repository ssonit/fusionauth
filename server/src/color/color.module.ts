import { Module } from '@nestjs/common'
import { ColorController } from './color.controller'
import { ColorService } from './color.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Color, ColorSchema } from 'src/schemas/Color.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Color.name,
        schema: ColorSchema
      }
    ])
  ],
  controllers: [ColorController],
  providers: [ColorService],
  exports: [ColorService]
})
export class ColorModule {}
