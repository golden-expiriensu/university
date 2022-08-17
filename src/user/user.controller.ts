import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from './decorator';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('create')
  async create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get('me')
  me(@GetUser() user: User) {
    delete user.password;
    return { user };
  }
}
