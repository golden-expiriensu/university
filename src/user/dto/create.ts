import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export enum Sex {
  Male = 'MALE',
  Female = 'FEMALE',
}

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
  @Type(() => Date)
  @IsDate()
  dateOfBirth?: string;
  @IsOptional()
  @IsString()
  sex?: Sex;
}
