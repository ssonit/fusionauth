import { Body, Controller, Post } from '@nestjs/common'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/create_payment_url')
  CreatePaymentUrl(@Body() body: any) {
    return this.paymentService.createPaymentUrl(body)
  }
}
