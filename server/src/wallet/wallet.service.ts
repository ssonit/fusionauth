import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Wallet } from 'src/schemas/Wallet.schema'
import { CreateWalletDto } from './dto'

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  async createWallet(payload: CreateWalletDto) {
    try {
      const wallet = await this.walletModel.findOne({
        user_id: payload.user_id
      })

      if (wallet) {
        return {
          data: wallet,
          msg: 'Wallet is exists'
        }
      }
      const createdWallet = new this.walletModel({
        user_id: payload.user_id,
        balance: payload.balance,
        currency: payload.currency
      })

      const data = await createdWallet.save()
      return {
        data,
        msg: 'Create wallet successfully'
      }
    } catch (error) {
      return error
    }
  }

  async getWalletByUserId(user_id: string) {
    try {
      const wallet = await this.walletModel.findOne({
        user_id
      })

      if (!wallet) {
        throw new NotFoundException('Wallet not created')
      }
      return {
        data: wallet,
        msg: 'Get wallet successfully'
      }
    } catch (error) {
      return error
    }
  }

  async updateBalance({ user_id, balance }: { user_id: string; balance: number }) {
    try {
      if (balance < 0) throw new BadRequestException('Balance must be greater than zero')
      const updatedWallet = await this.walletModel.findOneAndUpdate(
        {
          user_id
        },
        {
          balance
        },
        {
          new: true
        }
      )

      return {
        data: updatedWallet,
        msg: 'Updated balance wallet successfully'
      }
    } catch (error) {
      return error
    }
  }
}
