import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';

import { GetUser } from './decorator';
import { CreateUserDto, EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('create')
  public async create(@Body() dto: CreateUserDto): Promise<string> {
    return this.service.create(dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('edit')
  @UseGuards(JwtGuard)
  public edit(
    @GetUser('id') id: number,
    @Body() dto: EditUserDto,
  ): Promise<void> {
    return this.service.edit(id, dto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  public me(@GetUser() user: User): { user: User } {
    delete user.password;
    return { user };
  }
}
