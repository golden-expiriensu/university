import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  faculty: string;
  @IsNotEmpty()
  @IsString()
  university: string;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  group?: number;
}
