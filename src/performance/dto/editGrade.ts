import { PartialType, PickType } from '@nestjs/mapped-types';

import { CreateGradeDto } from '.';

export class EditGradeDto extends PartialType(
  PickType(CreateGradeDto, ['grade', 'lesson']),
) {}
