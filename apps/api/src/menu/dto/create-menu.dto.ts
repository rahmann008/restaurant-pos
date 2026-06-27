import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer'; // ⭐ IMPORTANT
// ⭐ IMPORTANT: validation decorators

export class CreateMenuDto {

  @IsString()        // ⭐ must be string
  @IsNotEmpty()      // ⭐ cannot be empty
  name!: string;

  
  @Type(() => Number)   // ⭐ IMPORTANT
  @IsNumber()
  price!: number;


  @IsString()        // ⭐ must be string
  @IsNotEmpty()      // ⭐ cannot be empty
  kitchenArea!: string;
}