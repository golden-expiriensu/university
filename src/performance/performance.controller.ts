import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import {
  OnlyMatchFacultyGuard,
  OnlyProfileOwnerGuard,
  OnlySameFacultyGuard,
  OnlyTeacherProfileGuard,
} from 'src/profile/guard';

import { CreateGradeDto, DeleteGradeDto, EditGradeDto, GetFacultyDto, GetGroupDto, GetMyDto, GetStudentDto } from './dto';
import { OnlyGradeCreatorGuard } from './guard';
import { PerformanceService } from './performance.service';

@Controller('performance/grade')
@UseGuards(JwtGuard, OnlyProfileOwnerGuard)
export class PerformanceController {
  constructor(private service: PerformanceService) {}

  @UseGuards(OnlyTeacherProfileGuard, OnlySameFacultyGuard)
  @Post('create')
  public createGrade(@Body() dto: CreateGradeDto): Promise<number> {
    return this.service.createGrade(dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(OnlyGradeCreatorGuard)
  @Patch('edit')
  public editGrade(@Body() dto: EditGradeDto): Promise<void> {
    return this.service.editGrade(dto);
  }

  @UseGuards(OnlyGradeCreatorGuard)
  @Delete('delete')
  public deleteGrade(@Body() dto: DeleteGradeDto): Promise<void> {
    return this.service.deleteGrade(dto);
  }

  @Get('get/my')
  public getMyGradesByLesson(@Body() dto: GetMyDto): Promise<number[]> {
    return this.service.getProfileGradesByLesson(dto.operatorPID, dto.lesson);
  }

  @Get('get/my/average-by-lesson')
  public getMyAverageGradeByLesson(@Body() dto: GetMyDto): Promise<number> {
    return this.service.getProfileAverageGradeByLesson(
      dto.operatorPID,
      dto.lesson,
    );
  }

  @UseGuards(OnlySameFacultyGuard)
  @Get('get/average-by-student')
  public getAverageGradeByStudent(@Body() dto: GetStudentDto): Promise<number> {
    return this.service.getAverageGradeByStudent(dto.targetPID);
  }

  @UseGuards(OnlyMatchFacultyGuard)
  @Get('get/average-by-group')
  public getAverageGradeByGroup(@Body() dto: GetGroupDto): Promise<number> {
    return this.service.getAverageGradeByGroup(
      dto.group,
      dto.faculty,
      dto.university,
    );
  }

  @UseGuards(OnlyMatchFacultyGuard)
  @Get('get/average-by-faculty')
  public getAverageGradeByFaculty(@Body() dto: GetFacultyDto): Promise<number> {
    return this.service.getAverageGradeByFaculty(dto.faculty, dto.university);
  }
}
