import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { PaginationSearch } from 'src/utils/dto'

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  product: string

  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  color: string

  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  storage: string

  @IsNotEmpty()
  @IsNumber()
  quantity: number
}

export class QueryCartDto extends PaginationSearch {}
