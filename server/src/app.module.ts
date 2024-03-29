import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './product/product.module'
import { ImageModule } from './image/image.module'
import { CartModule } from './cart/cart.module'
import { OrderModule } from './order/order.module'
import { WalletModule } from './wallet/wallet.module'
import { PaymentModule } from './payment/payment.module'

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
    ImageModule,
    CartModule,
    OrderModule,
    WalletModule,
    PaymentModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
