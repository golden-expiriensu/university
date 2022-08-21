import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteGradeDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    gradeId: number;
}