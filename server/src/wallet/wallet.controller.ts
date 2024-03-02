import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { WalletService } from './wallet.service'
import { CreateWalletDto } from './dto'

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/create')
  createWallet(@Body() body: CreateWalletDto) {
    return this.walletService.createWallet(body)
  }

  @Get('')
  getWalletByUserId(@Query('user_id') user_id: string) {
    return this.walletService.getWalletByUserId(user_id)
  }

  @Patch(':user_id')
  updateBalance(@Body('balance') balance: number, @Param('user_id') user_id: string) {
    return this.walletService.updateBalance({ user_id, balance })
  }
}
