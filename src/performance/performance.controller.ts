import { Body, Controller, Delete, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/user/decorator';

import { CreateGradeDto, EditGradeDto } from './dto';
import { DeleteGradeDto } from './dto/deleteGrade';
import { PerformanceService } from './performance.service';

@Controller('performance/grade')
@UseGuards(JwtGuard)
export class PerformanceController {
  constructor(private service: PerformanceService) {}

  @Post('create')
  public createGrade(
    @GetUser() userId: number,
    @Body() dto: CreateGradeDto,
  ): Promise<number> {
    return this.service.createGrade(userId, dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('edit')
  public editGrade(
    @GetUser() userId: number,
    @Body() dto: EditGradeDto,
  ): Promise<void> {
    return this.service.editGrade(userId, dto);
  }

  @Delete('delete')
  public deleteGrade(
    @GetUser() userId: number,
    @Body() dto: DeleteGradeDto,
  ): Promise<void> {
    return this.service.deleteGrade(userId, dto);
  }
}
