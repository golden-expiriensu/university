import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

import { Sex } from '.';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsOptional()
  @IsDate()
  dateOfBirth?: string;
  @IsOptional()
  @IsString()
  sex?: Sex;
}
