import {
  IsArray,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {

  @IsArray()          // ⭐ must be array
  @ArrayNotEmpty()    // ⭐ cannot be empty
  @Type(() => Number) // ⭐ converts values to number
  @IsNumber({}, { each: true }) 
  // ⭐ every item must be number

  itemIds!: number[];
}
