import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/user/decorator';

import { CreateProfileDto, EditProfileDto, ProfileIdDto } from './dto';
import { OnlyProfileOwnerGuard } from './guard';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(JwtGuard)
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Post()
  public create(
    @GetUser('id') userId: number,
    @Body() dto: CreateProfileDto,
  ): Promise<Profile> {
    return this.service.create(userId, dto);
  }

  @UseGuards(OnlyProfileOwnerGuard)
  @Get()
  public get(@Body() dto: ProfileIdDto): Promise<Profile> {
    return this.service.get(dto.operatorPID);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(OnlyProfileOwnerGuard)
  @Patch()
  public edit(@Body() dto: EditProfileDto): Promise<Profile> {
    return this.service.edit(dto);
  }

  @UseGuards(OnlyProfileOwnerGuard)
  @Delete()
  public delete(@Body() dto: ProfileIdDto): Promise<Profile> {
    return this.service.delete(dto.operatorPID);
  }
}
