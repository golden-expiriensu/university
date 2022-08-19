import { ForbiddenException, Injectable } from '@nestjs/common';
import { DBAccessService } from 'src/db-access/db-access.service';

import { CreateGradeDto, EditGradeDto } from './dto';
import { DeleteGradeDto } from './dto/deleteGrade';

@Injectable()
export class PerformanceService {
  constructor(private db: DBAccessService) {}

  public async createGrade(
    userId: number,
    dto: CreateGradeDto,
  ): Promise<number> {
    const { userId: teacherProfileOwner } = await this.db.profile.findUnique({
      where: {
        id: dto.teacherId,
      },
    });
    if (teacherProfileOwner !== userId)
      throw new ForbiddenException('Not profile owner');

    return (
      await this.db.performance.create({
        data: { ...dto },
      })
    ).id;
  }

  public editGrade(userId: number, dto: EditGradeDto): Promise<void> {
    return null;
  }

  public deleteGrade(userId: number, dto: DeleteGradeDto): Promise<void> {
    return null;
  }

  public getAverageGradeByFaculty(faculty: string): Promise<void> {
    return null;
  }
}
