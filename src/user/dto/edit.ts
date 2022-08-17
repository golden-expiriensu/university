import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

import { Sex } from '.';

export class EditUserDto {
  @IsNotEmpty()
  @IsString()
  name?: string;
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
  @IsNotEmpty()
  @IsString()
  password?: string;
  @IsOptional()
  @IsDate()
  dateOfBirth?: string;
  @IsOptional()
  @IsString()
  sex?: Sex;
}
