import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import {
  OnlyMatchFacultyGuard,
  OnlyProfileOwnerGuard,
  OnlySameFacultyGuard,
  OnlyTeacherProfileGuard,
} from 'src/profile/guard';

import { CreateGradeDto, EditGradeDto, GetFacultyDto, GetGroupDto, GetMyDto, GetStudentDto } from './dto';
import { OnlyGradeCreatorGuard } from './guard';
import { PerformanceService } from './performance.service';

@Controller('performance/grade')
@UseGuards(JwtGuard, OnlyProfileOwnerGuard)
export class PerformanceController {
  constructor(private service: PerformanceService) {}

  @UseGuards(OnlyTeacherProfileGuard, OnlySameFacultyGuard)
  @Post()
  public createGrade(@Body() dto: CreateGradeDto): Promise<number> {
    return this.service.createGrade(dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(OnlyGradeCreatorGuard)
  @Patch(':id')
  public editGrade(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditGradeDto,
  ): Promise<void> {
    return this.service.editGrade(id, dto);
  }

  @UseGuards(OnlyGradeCreatorGuard)
  @Delete(':id')
  public deleteGrade(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.deleteGrade(id);
  }

  @Get('my/all-by-lesson')
  public getMyGradesByLesson(@Body() dto: GetMyDto): Promise<number[]> {
    return this.service.getProfileGradesByLesson(dto.operatorPID, dto.lesson);
  }

  @Get('my/average-by-lesson')
  public getMyAverageGradeByLesson(@Body() dto: GetMyDto): Promise<number> {
    return this.service.getProfileAverageGradeByLesson(
      dto.operatorPID,
      dto.lesson,
    );
  }

  @UseGuards(OnlySameFacultyGuard)
  @Get('average-by-student')
  public getAverageGradeByStudent(@Body() dto: GetStudentDto): Promise<number> {
    return this.service.getAverageGradeByStudent(dto.targetPID);
  }

  @UseGuards(OnlyMatchFacultyGuard)
  @Get('average-by-group')
  public getAverageGradeByGroup(@Body() dto: GetGroupDto): Promise<number> {
    return this.service.getAverageGradeByGroup(
      dto.group,
      dto.faculty,
      dto.university,
    );
  }

  @UseGuards(OnlyMatchFacultyGuard)
  @Get('average-by-faculty')
  public getAverageGradeByFaculty(@Body() dto: GetFacultyDto): Promise<number> {
    return this.service.getAverageGradeByFaculty(dto.faculty, dto.university);
  }
}
