import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';

import { CreateGradeDto } from '.';
import { DeleteGradeDto } from './deleteGrade';

export class EditGradeDto extends IntersectionType(
  PartialType(PickType(CreateGradeDto, ['grade', 'lesson'])),
  DeleteGradeDto,
) {}
