import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from '.';

export class EditUserDto extends PartialType(
  OmitType(CreateUserDto, ['email']),
) {}
