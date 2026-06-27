import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMenuDto {

  @IsOptional()   // ⭐ IMPORTANT: field can be skipped
  @IsString()
  name?: string;

  @IsOptional()   // ⭐ IMPORTANT
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @IsOptional()   // ⭐ IMPORTANT
  @IsString()
  kitchenArea?: string;
}
