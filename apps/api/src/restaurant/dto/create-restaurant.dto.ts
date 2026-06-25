import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantDto {

  @IsString()           // ⭐ IMPORTANT: must be string
  @IsNotEmpty()         // ⭐ IMPORTANT: cannot be empty
  name!: string;
}