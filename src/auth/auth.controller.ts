import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService, private userService: UserService) {}

  @Post('signup')
  public async signup(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  public async signin(@Body() dto: AuthDto) {
    return this.service.signin(dto);
  }
}
