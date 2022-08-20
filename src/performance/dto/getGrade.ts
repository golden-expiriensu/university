import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class ProfileId {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  profileId: number;
}

class Lesson {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  lesson: number;
}

class Group {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  group: number;
}

class Faculty {
  @IsNotEmpty()
  @IsString()
  faculty: string;
}

class University {
  @IsNotEmpty()
  @IsString()
  university: string;
}

export class ProfileIdAndLessonDto extends IntersectionType(
  ProfileId,
  Lesson,
) {}

export class ProfileIdDto extends ProfileId {}

export class GroupDto extends Group {}

export class FacultyDto extends Faculty {}

export class UniversityDto extends University {}
