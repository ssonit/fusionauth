import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'
import { SortDirection, UnitStorage } from 'src/utils/enums'

class Storage {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEnum(UnitStorage)
  unit: UnitStorage
}

class Inventory {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  color: string

  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Storage)
  storage: Storage

  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsNotEmpty()
  @IsNumber()
  price: number
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  images: string[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Inventory)
  specs: Inventory[]
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  description: string

  @IsArray()
  @ArrayNotEmpty()
  images: string[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Inventory)
  specs: Inventory[]
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
