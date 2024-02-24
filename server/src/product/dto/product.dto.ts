import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { SortDirection } from 'src/utils/enums'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsArray()
  @ArrayNotEmpty()
  images: string[]
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsArray()
  @ArrayNotEmpty()
  images: string[]
}

export class QueryProductDto {
  @IsNotEmpty()
  @IsString()
  page: string

  @IsNotEmpty()
  @IsString()
  limit: string

  @IsOptional()
  @IsString()
  search: string

  @IsOptional()
  @IsString()
  user_id: string

  @IsOptional()
  @IsString()
  sort: string

  @IsOptional()
  @IsEnum(SortDirection)
  dir: SortDirection

  @IsOptional()
  @IsString()
  ids: string
}
