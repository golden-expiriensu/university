import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard';

import { GetUser } from './decorator';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('create')
  public async create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  public me(@GetUser() user: User) {
    delete user.password;
    return { user };
  }
}
