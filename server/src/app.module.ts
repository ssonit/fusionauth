import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './product/product.module'
import { ColorModule } from './color/color.module'
import { ImageModule } from './image/image.module'
import { StorageModule } from './storage/storage.module'
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService]
    }),
    ProductModule,
    ColorModule,
    ImageModule,
    StorageModule,
    CartModule,
    OrderModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
