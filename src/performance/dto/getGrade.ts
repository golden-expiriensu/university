import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class OperatorProfileId {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  operatorPID: number;
}

class TargetProfileId {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  targetPID: number;
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

export class GetMyDto extends IntersectionType(OperatorProfileId, Lesson) {}

export class GetStudentDto extends TargetProfileId {}

export class GetGroupDto extends IntersectionType(Group, Faculty, University) {}

export class GetFacultyDto extends IntersectionType(Faculty, University) {}

export class GetUniversityDto extends University {}
