import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { CurrencyWallet } from 'src/utils/enums'

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsOptional()
  @IsNumber()
  balance: number

  @IsOptional()
  @IsEnum(CurrencyWallet)
  currency: CurrencyWallet
}
