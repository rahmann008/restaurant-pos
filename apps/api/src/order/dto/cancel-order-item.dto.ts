import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CancelOrderItemDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  orderItemId!: number;
  // ⭐ IMPORTANT: which item inside the order should be cancelled

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity?: number;
  // ⭐ IMPORTANT:
  // If quantity is provided → cancel only that quantity
  // If quantity is not provided → cancel entire item

  @IsOptional()
  @IsString()
  reason?: string;
  // ⭐ Optional cancellation reason
}