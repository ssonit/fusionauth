import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { SortDirection } from './enums'

export class PaginationSearch {
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
