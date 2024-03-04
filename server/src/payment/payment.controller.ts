import { Body, Controller, Get, Post } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { CreatePaypalOrder } from './dto'
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('config')
  getConfig() {
    return this.paymentService.getConfig()
  }

  @Get('get-access-token')
  async getAccessToken() {
    const data = await this.paymentService.getAccessToken()
    return {
      data,
      msg: 'Get access token successfully'
    }
  }

  @Post('create-paypal-order')
  async createPaypalOrder(@Body() body: CreatePaypalOrder) {
    const data = await this.paymentService.createPaypalOrder(body)
    return {
      data,
      msg: 'Create payment order'
    }
  }

  @Post('capture-paypal-order')
  async capturePaypalOrder(@Body() body: any) {
    const data = await this.paymentService.capturePaypalOrder(body)
    return {
      data,
      msg: 'Capture payment order'
    }
  }
}
