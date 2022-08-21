import { Injectable } from '@nestjs/common';
import { DBAccessService } from 'src/db-access/db-access.service';

import { CreateGradeDto, EditGradeDto } from './dto';
import { SelectGradesDBResponse } from './types';

@Injectable()
export class PerformanceService {
  constructor(private db: DBAccessService) {}

  public async createGrade(dto: CreateGradeDto): Promise<number> {
    return (
      await this.db.performance.create({
        data: {
          teacherId: dto.operatorPID,
          studentId: dto.targetPID,
          lesson: dto.lesson,
          grade: dto.grade,
        },
      })
    ).id;
  }

  public async editGrade(id: number, dto: EditGradeDto): Promise<void> {
    await this.db.performance.update({
      where: { id },
      data: dto,
    });
  }

  public async deleteGrade(id: number): Promise<void> {
    await this.db.performance.delete({ where: { id } });
  }

  public async getProfileGradesByLesson(
    profileId: number,
    lesson: number,
  ): Promise<number[]> {
    return this.db.performance
      .findMany({
        where: {
          lesson,
          student: {
            userId: profileId,
          },
        },
      })
      .then((a) => a.map((e) => e.grade));
  }

  public async getProfileAverageGradeByLesson(
    profileId: number,
    lesson: number,
  ): Promise<number> {
    const grades = await this.getProfileGradesByLesson(profileId, lesson);
    return grades.reduce((t, c) => t + c, 0) / grades.length;
  }

  public async getAverageGradeByStudent(
    studentProfileId: number,
  ): Promise<number> {
    return this.findAverageGrade(
      await this.getProfileGottenGrades({
        where: { userId: studentProfileId },
      }),
    );
  }

  public async getAverageGradeByGroup(
    group: number,
    faculty: string,
    university: string,
  ): Promise<number> {
    return this.findAverageGrade(
      await this.getProfileGottenGrades({
        where: { group, faculty, university },
      }),
    );
  }

  public async getAverageGradeByFaculty(
    faculty: string,
    university: string,
  ): Promise<number> {
    return this.findAverageGrade(
      await this.getProfileGottenGrades({ where: { faculty, university } }),
    );
  }

  private async findAverageGrade(
    dbResponse: SelectGradesDBResponse,
  ): Promise<number> {
    const flatten = dbResponse.map((e) => e.gottenGrades).flat();
    return flatten.reduce((t, c) => t + c.grade, 0) / flatten.length;
  }

  private getProfileGottenGrades(
    filter: object,
  ): Promise<SelectGradesDBResponse> {
    return this.db.profile.findMany({
      where: {
        NOT: {
          group: null,
        },
      },
      select: {
        userId: true,
        gottenGrades: {
          select: {
            grade: true,
          },
        },
      },
      ...filter,
    });
  }
}
