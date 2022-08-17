import { IsDate, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

import { Sex } from '.';

export class EditUserDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsDate()
  dateOfBirth?: string;
  @IsOptional()
  @IsString()
  sex?: Sex;
}
