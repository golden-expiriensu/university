import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGradeDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    operatorPID: number;
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    targetPID: number;
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    grade: number;
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    lesson: number;
}