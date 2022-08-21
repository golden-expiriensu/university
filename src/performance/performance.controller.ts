import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { OnlyProfileOwnerGuard, OnlySameFacultyGuard, OnlyTeacherProfileGuard } from 'src/profile/guard';

import {
  CreateGradeDto,
  DeleteGradeDto,
  EditGradeDto,
  FacultyDto,
  GroupDto,
  ProfileIdAndLessonDto,
  ProfileIdDto,
  UniversityDto,
} from './dto';
import { OnlyGradeCreatorGuard } from './guard';
import { PerformanceService } from './performance.service';

@Controller('performance/grade')
@UseGuards(JwtGuard)
export class PerformanceController {
  constructor(private service: PerformanceService) {}

  // TODO: same faculty and group
  @UseGuards(OnlyTeacherProfileGuard)
  @Post('create')
  public createGrade(@Body() dto: CreateGradeDto): Promise<number> {
    return this.service.createGrade(dto);
  }

  // TODO: same faculty and group ?
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

  @UseGuards(OnlyProfileOwnerGuard)
  @Get('get/my')
  public getMyGradesByLesson(
    @Body() dto: ProfileIdAndLessonDto,
  ): Promise<number[]> {
    return this.service.getProfileGradesByLesson(dto.profileId, dto.lesson);
  }

  @UseGuards(OnlyProfileOwnerGuard)
  @Get('get/my/average-by-lesson')
  public getMyAverageGradeByLesson(
    @Body() dto: ProfileIdAndLessonDto,
  ): Promise<number> {
    return this.service.getProfileAverageGradeByLesson(
      dto.profileId,
      dto.lesson,
    );
  }

  @Get('get/average-by-student')
  public getAverageGradeByStudent(@Body() dto: ProfileIdDto): Promise<number> {
    return this.service.getAverageGradeByStudent(dto.profileId);
  }

  @Get('get/average-by-group')
  public getAverageGradeByGroup(@Body() dto: GroupDto): Promise<number> {
    return this.service.getAverageGradeByGroup(dto.group);
  }

  @UseGuards(OnlySameFacultyGuard)
  @Get('get/average-by-faculty')
  public getAverageGradeByFaculty(@Body() dto: FacultyDto): Promise<number> {
    return this.service.getAverageGradeByFaculty(dto.faculty);
  }

  @Get('get/average-by-university')
  public getAverageGradeByUniversity(
    @Body() dto: UniversityDto,
  ): Promise<number> {
    return this.service.getAverageGradeByUniversity(dto.university);
  }
}
