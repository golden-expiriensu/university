import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateProfileDto } from '.';

export class EditProfileDto extends PartialType(CreateProfileDto) {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  profileId: number;
}
