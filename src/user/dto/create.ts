import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

import { Sex } from '.';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsOptional()
    @IsEmail()
    email?: string;
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
    sex?: Sex
}