import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { Profile } from '@prisma/client';
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
  ): Promise<Profile> {
    return this.service.create(userId, dto);
  }

  @Patch('edit')
  public async editProfile(
    @GetUser('id') userId: number,
    @Body() dto: EditProfileDto,
  ) {
    return this.service.edit(userId, dto);
  }
}
