import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGradeDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    teacherId: number;
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    studentId: number;
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    grade: number;
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    lesson: number;
}