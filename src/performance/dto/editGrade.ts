import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateGradeDto } from '.';

export class EditGradeDto extends PartialType(
  OmitType(CreateGradeDto, ['teacherId']),
) {}
