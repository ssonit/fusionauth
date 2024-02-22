import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { PaginationSearch } from 'src/utils/dto'

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsNotEmpty()
  @IsString()
  product: string

  @IsNotEmpty()
  @IsString()
  color: string

  @IsNotEmpty()
  @IsString()
  storage: string

  @IsNotEmpty()
  @IsNumber()
  quantity: number
}

export class QueryCartDto extends PaginationSearch {}
