import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

import { CreateGradeDto, EditGradeDto } from './dto';
import { DeleteGradeDto } from './dto/deleteGrade';
import { PerformanceService } from './performance.service';

@Controller('performance/grade')
@UseGuards(JwtGuard)
export class PerformanceController {
  constructor(private service: PerformanceService) {}

  @Post('create')
  public createGrade(@Body() dto: CreateGradeDto): Promise<number> {
    return this.service.createGrade(dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('edit')
  public editGrade(@Body() dto: EditGradeDto): Promise<void> {
    return this.service.editGrade(dto);
  }

  @Delete('delete')
  public deleteGrade(@Body() dto: DeleteGradeDto): Promise<void> {
    return this.service.deleteGrade(dto);
  }

  @Get('get/my')
  public getMyGradesByLesson(@Body() dto: { lesson: number }): Promise<number> {
    return null;
  }

  @Get('get/my/average-by-lesson')
  public getMyAverageGradeByLesson(
    @Body() dto: { lesson: number },
  ): Promise<number> {
    return null;
  }

  @Get('get/average-by-student')
  public getAverageGradeByStudent(
    @Body() dto: { studentProfileId: number },
  ): Promise<number> {
    return this.service.getAverageGradeByStudent(dto.studentProfileId);
  }

  @Get('get/average-by-group')
  public getAverageGradeByGroup(
    @Body() dto: { group: number },
  ): Promise<number> {
    return this.service.getAverageGradeByGroup(dto.group);
  }

  @Get('get/average-by-faculty')
  public getAverageGradeByFaculty(
    @Body() dto: { faculty: string },
  ): Promise<number> {
    return this.service.getAverageGradeByFaculty(dto.faculty);
  }

  @Get('get/average-by-university')
  public getAverageGradeByUniversity(
    @Body() dto: { university: string },
  ): Promise<number> {
    return this.service.getAverageGradeByUniversity(dto.university);
  }
}
