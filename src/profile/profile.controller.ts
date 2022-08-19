import { Body, Controller, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/user/decorator';

import { CreateProfileDto, EditProfileDto } from './dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(JwtGuard)
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Post('create')
  public async create(
    @GetUser('id') userId: number,
    @Body() dto: CreateProfileDto,
  ): Promise<number> {
    return this.service.create(userId, dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('edit')
  public async editProfile(
    @GetUser('id') userId: number,
    @Body() dto: EditProfileDto,
  ) {
    return this.service.edit(userId, dto);
  }
}
