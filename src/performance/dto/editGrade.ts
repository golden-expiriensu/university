import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateGradeDto } from '.';
import { DeleteGradeDto } from './deleteGrade';

export class EditGradeDto extends IntersectionType(
  PartialType(OmitType(CreateGradeDto, ['teacherId'])),
  DeleteGradeDto,
) {}
