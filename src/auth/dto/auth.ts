import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmptyObject()
  login: {
    name?: string;
    email?: string;
    phone?: string;
  };
  @IsNotEmpty()
  @IsString()
  password: string;
}
