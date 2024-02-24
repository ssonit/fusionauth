import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'
import { PaymentType } from 'src/utils/enums'

class ProductOrder {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  product_id: string

  @IsNotEmpty()
  @IsNumber()
  quantity: number
}

export class CreateOrderManyDto {
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrder)
  product_order: ProductOrder[]

  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  phone: string

  @IsNotEmpty()
  @IsString()
  address: string

  @IsOptional()
  @IsString()
  notes: string

  @IsNotEmpty()
  @IsEnum(PaymentType)
  payment_type: PaymentType
}
