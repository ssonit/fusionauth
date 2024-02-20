import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { UnitStorage } from 'src/utils/enums'

export class CreateStorageDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEnum(UnitStorage)
  unit: UnitStorage
}
